export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'code'; text: string }
  | { type: 'ul'; items: string[] };

export type Post = {
  slug: string;
  date: string;
  readTime: string;
  title: string;
  tag: string;
  excerpt: string;
  featured?: boolean;
  body: Block[];
};

// HINWEIS: Diese Artikel sind Entwürfe auf Basis echter Projekte — gern redigieren,
// kürzen oder mit konkreten Code-Beispielen ergänzen.
export const posts: Post[] = [
  {
    slug: 'laravel-nova-multi-mandanten',
    date: '2025-11-04',
    readTime: '11 min',
    title: 'Laravel Nova für Multi-Mandanten-Portale: was wirklich skaliert',
    tag: 'aus der praxis',
    featured: true,
    excerpt:
      'Drei Codo-Iterationen und ein Connected-Product-Portal später: hier ist die Resource-Struktur, die Policies und das Theming-Pattern, mit dem Nova auch bei 12 Mandanten noch übersichtlich bleibt.',
    body: [
      {
        type: 'p',
        text: 'Laravel Nova ist schnell aufgesetzt — ein paar Resources, fertig ist das Backend. Spannend wird es erst, wenn dasselbe Panel mehrere Kunden bedienen soll, jeder mit eigenen Daten, eigenem Branding und eigenen Rechten. Nach drei Iterationen von Codo und einem Connected-Product-Portal sind hier die Muster, die sich gehalten haben.',
      },
      { type: 'h2', text: 'Mandanten gehören in den Query-Scope, nicht in die UI' },
      {
        type: 'p',
        text: 'Die erste Versuchung ist, in jeder Resource per Filter den Mandanten auszuwählen. Das skaliert nicht und ist eine Datenschutz-Falle. Stattdessen lebt die Mandanten-Trennung in einem globalen Scope auf dem Model — der aktuelle Tenant kommt aus dem eingeloggten User, nicht aus der Anfrage.',
      },
      {
        type: 'code',
        text: "protected static function booted(): void\n{\n    static::addGlobalScope('tenant', function (Builder $q) {\n        if ($tenantId = auth()->user()?->tenant_id) {\n            $q->where('tenant_id', $tenantId);\n        }\n    });\n}",
      },
      {
        type: 'p',
        text: 'Damit ist jede Nova-Resource, jede Relation und jede Metrik automatisch mandantensicher — ohne dass man es in 40 Resources einzeln vergessen kann.',
      },
      { type: 'h2', text: 'Policies sind die halbe Miete' },
      {
        type: 'p',
        text: 'Nova respektiert Laravel-Policies vollständig. Rollenbasierte Rechte gehören dort hinein, nicht in `canSee`-Closures verstreut über die Resources. Eine zentrale Policy pro Model, eine klare Rollen-Matrix — und die UI passt sich von selbst an.',
      },
      {
        type: 'ul',
        items: [
          'Sichtbarkeit von Resources über `authorizedToViewAny` aus der Policy ableiten',
          'Felder pro Rolle mit `->canSee()` ausblenden, aber die Logik aus der Policy ziehen',
          'Actions immer zusätzlich serverseitig absichern — die UI ist kein Schutz',
        ],
      },
      { type: 'h2', text: 'Theming pro Mandant ohne Panel-Wildwuchs' },
      {
        type: 'p',
        text: 'Markenspezifisches Frontend je Kunde (bei Codo u.a. Kemper und Muli Cycles) heißt nicht: ein Panel pro Kunde. Das Branding kommt aus der Tenant-Konfiguration — Logo, Akzentfarbe, ein paar CSS-Variablen — und wird zur Laufzeit injiziert. Ein Codebestand, n Erscheinungsbilder.',
      },
      { type: 'h2', text: 'Was bei 12 Mandanten zählt' },
      {
        type: 'p',
        text: 'Bei einer Handvoll Kunden verzeiht Nova fast alles. Ab etwa einem Dutzend merkt man, ob die Struktur trägt: Eager Loading gegen N+1 in den Index-Views, Metriken mit Caching statt Live-Aggregation, und ein striktes „ein Konzept, einmal gelöst"-Prinzip. Der Rest ist Disziplin — und das Wissen, dass der Kollege in zwei Jahren das auch noch lesen können muss.',
      },
    ],
  },
  {
    slug: 'typo3-sharepoint-integration',
    date: '2025-09-21',
    readTime: '7 min',
    title: 'TYPO3 + SharePoint: eine Integration, die nicht weh tut',
    tag: 'integration',
    excerpt:
      'Wie wir das Kirchhoff-Intranet an Microsoft Graph angeschlossen haben — Auth, Caching, und der Trick mit den Drive-IDs.',
    body: [
      {
        type: 'p',
        text: 'Im Kirchhoff-Intranet sollten Dokumente aus SharePoint direkt im TYPO3-Frontend auftauchen — aktuell, durchsuchbar, ohne dass jemand etwas doppelt pflegt. Die Verbindung läuft über Microsoft Graph. Klingt geradlinig, hat aber drei Stolpersteine, die man besser vorher kennt.',
      },
      { type: 'h2', text: 'Auth: App-only, nicht im Namen eines Users' },
      {
        type: 'p',
        text: 'Ein Intranet liest Inhalte serverseitig — also App-only-Authentifizierung über den Client-Credentials-Flow, nicht delegiert. Token holen, im Cache halten, vor Ablauf erneuern. Wichtig: die App-Registrierung nur mit den Berechtigungen ausstatten, die wirklich gebraucht werden (Sites.Read.All reicht meist).',
      },
      { type: 'h2', text: 'Der Trick mit den Drive-IDs' },
      {
        type: 'p',
        text: 'Graph adressiert Dateien nicht über Pfade, sondern über Site- und Drive-IDs. Diese IDs sind stabil, aber nicht offensichtlich — man löst sie einmal aus dem Site-Namen auf und legt sie in die Konfiguration. Wer bei jedem Request die ID neu auflöst, verschenkt einen kompletten Roundtrip.',
      },
      {
        type: 'code',
        text: "GET /sites/{hostname}:/sites/{site-path}\n→ liefert die site-id\nGET /sites/{site-id}/drives\n→ liefert die drive-id (einmal merken!)",
      },
      { type: 'h2', text: 'Caching ist hier kein Bonus, sondern Pflicht' },
      {
        type: 'p',
        text: 'Graph hat Rate Limits, und ein Intranet-Aufmacher, der bei jedem Seitenaufruf live abfragt, wird langsam und fragil. Wir cachen die Datei-Listen mit kurzer TTL und invalidieren gezielt, wenn sich etwas ändert. Das Frontend bleibt schnell, die API entspannt.',
      },
      {
        type: 'ul',
        items: [
          'Token im Server-Cache, Erneuerung mit Puffer vor Ablauf',
          'Drive-IDs als Konfiguration, nicht als Laufzeit-Lookup',
          'Datei-Listen mit kurzer TTL cachen, Fehlerfälle leise abfangen',
        ],
      },
      {
        type: 'p',
        text: 'Das Ergebnis: SharePoint-Dokumente erscheinen im Intranet, als wären sie schon immer dort gewesen — und niemand muss zwei Systeme pflegen.',
      },
    ],
  },
  {
    slug: 'dual-database-laravel',
    date: '2025-07-12',
    readTime: '5 min',
    title: 'Dual-Database in Laravel: wenn ein Connection-String nicht reicht',
    tag: 'architektur',
    excerpt:
      'Geräte-Telemetrie schreibt auf DB A, der Shop liest aus DB B. Eloquent, Migrations und Tests in einer 2-DB-Welt.',
    body: [
      {
        type: 'p',
        text: 'Beim Thermocook-Portal treffen zwei Welten aufeinander: die Geräte-Telemetrie schreibt in die eine Datenbank, das Shop-System liest aus einer anderen. Laravel kann das von Haus aus — man muss nur ein paar Dinge bewusst entscheiden, sonst rächt es sich im Test.',
      },
      { type: 'h2', text: 'Zwei Connections, klar benannt' },
      {
        type: 'p',
        text: 'Beide Verbindungen werden in `config/database.php` definiert und sprechend benannt. Models bekommen ihre Connection explizit — Raten ist keine Strategie.',
      },
      {
        type: 'code',
        text: "class DeviceReading extends Model\n{\n    protected $connection = 'telemetry';\n}\n\nclass ShopOrder extends Model\n{\n    protected $connection = 'shop';\n}",
      },
      { type: 'h2', text: 'Migrations wissen, wohin sie gehören' },
      {
        type: 'p',
        text: 'Jede Migration legt fest, auf welcher Connection sie läuft. Sonst landet die halbe Telemetrie-Struktur in der Shop-DB und niemand findet sie wieder.',
      },
      {
        type: 'code',
        text: "Schema::connection('telemetry')->create('device_readings', function (Blueprint $t) {\n    $t->id();\n    $t->string('device_serial')->index();\n    $t->json('payload');\n    $t->timestamps();\n});",
      },
      { type: 'h2', text: 'Der wunde Punkt: Tests' },
      {
        type: 'p',
        text: 'Eloquent kann nicht über zwei Connections joinen — das ist keine Schwäche, sondern eine Designgrenze. Beziehungen über die DB-Grenze hinweg löst man in der Anwendung, nicht in SQL. Und in den Tests müssen beide Connections migriert werden, sonst laufen sie grün, obwohl die zweite DB leer ist.',
      },
      {
        type: 'ul',
        items: [
          'Connections explizit auf Models und Migrations setzen',
          'Cross-DB-Joins vermeiden — Beziehungen in der App auflösen',
          'In Tests beide Connections migrieren und seeden',
        ],
      },
    ],
  },
  {
    slug: 'svg-cnc-schwellwerte',
    date: '2025-05-30',
    readTime: '6 min',
    title: 'SVG → CNC: Schwellwerte, die wirklich fräsbar sind',
    tag: 'bildverarbeitung',
    excerpt:
      'Lessons learned aus dem MyLogoWaffel-Konfigurator — Vektorisierung, Schwellwerte und warum 1mm doch viel ist.',
    body: [
      {
        type: 'p',
        text: 'Der MyLogoWaffel-Konfigurator nimmt ein hochgeladenes Logo und macht daraus eine fräsbare Vorlage für eine Waffelbackplatte. Zwischen „sieht am Bildschirm gut aus" und „lässt sich in Metall fräsen" liegt mehr Bildverarbeitung, als man denkt.',
      },
      { type: 'h2', text: 'Erst binarisieren, dann vektorisieren' },
      {
        type: 'p',
        text: 'Ein Logo kommt als beliebiges Bild — Farbverläufe, Anti-Aliasing, JPEG-Artefakte. Die Fräse kennt nur „Material weg" oder „Material bleibt". Also reduziert man das Bild zuerst auf Schwarz/Weiß über einen Schwellwert, bevor irgendetwas in Vektoren übersetzt wird. Der Schwellwert ist dabei kein Detail, sondern die Hauptentscheidung.',
      },
      { type: 'h2', text: 'Warum 1 mm viel ist' },
      {
        type: 'p',
        text: 'Am Monitor wirkt eine feine Linie elegant. Auf einer Waffelplatte ist eine 1 mm breite Struktur schon grenzwertig: zu schmal, und der Fräser kommt nicht sauber durch — oder das Detail bricht im Betrieb. Es lohnt sich, eine Mindest-Strukturbreite zu erzwingen und dünne Linien entweder zu verstärken oder zu verwerfen.',
      },
      {
        type: 'ul',
        items: [
          'Schwellwert konfigurierbar machen — ein Wert passt nicht für jedes Logo',
          'Mindest-Strukturbreite erzwingen, sonst wird es unfräsbar',
          'Kleine Inseln und Löcher filtern, bevor sie zum Werkzeugproblem werden',
        ],
      },
      { type: 'h2', text: 'Vorschau ehrlich halten' },
      {
        type: 'p',
        text: 'Die wichtigste UX-Entscheidung: die Vorschau zeigt das binarisierte, fräsbare Ergebnis — nicht das schöne Original. Nutzer sollen sehen, was tatsächlich entsteht, und den Schwellwert anpassen können, bis es passt. Ein bisschen Geometrie, ein bisschen Bildverarbeitung, sehr viele Waffeln.',
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/* Shared code: field model, Europeana readiness and EDM export. Used by index.html and ficha.html. */
var COL = (function () {
  'use strict';
  // ---------- Vocabularies ----------
  var UNESCO = ['Tradições e expressões orais', 'Artes do espetáculo', 'Práticas sociais, rituais e eventos festivos', 'Conhecimentos e práticas relacionados com a natureza e o universo', 'Técnicas artesanais tradicionais'];
  var RIGHTS = [
    ['', '— por decidir —', 0],
    ['http://creativecommons.org/publicdomain/zero/1.0/', 'CC0 1.0', 4],
    ['http://creativecommons.org/publicdomain/mark/1.0/', 'Public Domain Mark', 4],
    ['http://creativecommons.org/licenses/by/4.0/', 'CC BY 4.0', 4],
    ['http://creativecommons.org/licenses/by-sa/4.0/', 'CC BY-SA 4.0', 4],
    ['http://creativecommons.org/licenses/by-nc/4.0/', 'CC BY-NC 4.0', 3],
    ['http://creativecommons.org/licenses/by-nc-sa/4.0/', 'CC BY-NC-SA 4.0', 3],
    ['http://creativecommons.org/licenses/by-nd/4.0/', 'CC BY-ND 4.0', 3],
    ['http://creativecommons.org/licenses/by-nc-nd/4.0/', 'CC BY-NC-ND 4.0', 3],
    ['http://rightsstatements.org/vocab/NoC-NC/1.0/', 'No Copyright – Non-Commercial Use Only', 3],
    ['http://rightsstatements.org/vocab/NoC-OKLR/1.0/', 'No Copyright – Other Known Legal Restrictions', 3],
    ['http://rightsstatements.org/vocab/InC-EDU/1.0/', 'In Copyright – Educational Use Permitted', 3],
    ['http://rightsstatements.org/vocab/InC/1.0/', 'In Copyright', 2]
  ];
  var MODEL_TYPES = ['', '3DMesh', '3DPointCloud', 'BIM', 'parametricModel', '3DGaussianSplatting'];
  var USAGES = ['', 'knowledge', 'infotainment', 'creativity', 'curation'];
  var STATUS = ['Rascunho', 'Para validação', 'Validado', 'Pronto para a Europeana'];
  var CONDITION = ['', 'Bom', 'Regular', 'Mau', 'Muito mau'];

  // ---------- Field model (drives form, record view, CSV and EDM) ----------
  var SECTIONS = [
    ['id', 'Identificação'], ['phys', 'Descrição física'], ['ctx', 'Contexto e autoria'],
    ['cons', 'Conservação e localização'], ['pci', 'Património imaterial associado'],
    ['dig', 'Representações digitais'], ['eu', 'Europeana e estado do registo']
  ];
  var F = [
    ['id', 'inv', 'N.º de inventário', 'text', 'dc:identifier', 'Ex.: MECC.0193. Obrigatório; não se altera depois de criado.'],
    ['id', 'oldInv', 'N.º antigo', 'text', ''],
    ['id', 'lot', 'Lote / núcleo', 'text', 'dcterms:isPartOf'],
    ['id', 'title_pt', 'Denominação (PT)', 'text', 'dc:title @pt', 'Obrigatório.'],
    ['id', 'title_en', 'Título (EN)', 'text', 'dc:title @en'],
    ['id', 'type_pt', 'Tipologia', 'text', 'dc:type @pt'],
    ['id', 'type_uri', 'Tipologia – URI (Getty AAT)', 'url', 'dc:type'],
    ['phys', 'material_pt', 'Matéria', 'text', 'dcterms:medium @pt'],
    ['phys', 'material_uri', 'Matéria – URI (Getty AAT)', 'url', 'dcterms:medium'],
    ['phys', 'technique', 'Técnica', 'text', 'dc:format @pt'],
    ['phys', 'height', 'Altura (cm)', 'number', 'dcterms:extent'],
    ['phys', 'width', 'Largura (cm)', 'number', 'dcterms:extent'],
    ['phys', 'depth', 'Profundidade (cm)', 'number', 'dcterms:extent'],
    ['phys', 'weight', 'Peso (g)', 'number', 'dcterms:extent'],
    ['phys', 'extent_note', 'Nota sobre as dimensões', 'text', ''],
    ['phys', 'decoration', 'Decoração / marcas / inscrições', 'textarea', 'dc:description @pt'],
    ['phys', 'desc_pt', 'Descrição (PT)', 'textarea', 'dc:description @pt'],
    ['phys', 'desc_en', 'Descrição (EN)', 'textarea', 'dc:description @en'],
    ['ctx', 'provenance_pt', 'Proveniência / local de uso', 'text', 'dcterms:spatial @pt'],
    ['ctx', 'place_uri', 'Local – URI (GeoNames)', 'url', 'dcterms:spatial'],
    ['ctx', 'creator', 'Autoria / oficina (confirmada)', 'text', 'dc:creator'],
    ['ctx', 'creator_uri', 'Autoria – URI', 'url', 'dc:creator'],
    ['ctx', 'attribution_note', 'Hipóteses de atribuição (não publicadas como autoria)', 'textarea', ''],
    ['ctx', 'date', 'Datação (ano ou intervalo)', 'text', 'dc:date'],
    ['ctx', 'period', 'Período', 'text', 'dcterms:temporal @pt'],
    ['cons', 'condition', 'Estado de conservação', 'select:CONDITION', ''],
    ['cons', 'condition_date', 'Data da avaliação', 'date', ''],
    ['cons', 'location', 'Localização atual', 'text', ''],
    ['cons', 'location_uri', 'Localização – URI (GeoNames)', 'url', 'edm:currentLocation'],
    ['pci', 'ich_domain', 'Domínio PCI (UNESCO 2003)', 'select:UNESCO', 'dc:subject @pt'],
    ['pci', 'ich_domain_uri', 'Domínio – URI (Wikidata)', 'url', 'dc:subject'],
    ['pci', 'ich_core', 'Núcleo PCI / saber-fazer', 'text', 'dc:subject @pt'],
    ['pci', 'ich_core_uri', 'Núcleo – URI (Wikidata)', 'url', 'dc:subject'],
    ['pci', 'ich_uses', 'Usos e práticas associadas', 'textarea', 'dc:subject @pt'],
    ['pci', 'testimony_ref', 'Entrevista / fonte associada', 'text', 'dcterms:isReferencedBy @pt'],
    ['pci', 'testimony_quote', 'Excerto do testemunho (PT)', 'textarea', ''],
    ['pci', 'testimony_quote_en', 'Excerto do testemunho (EN)', 'textarea', ''],
    ['pci', 'testimony_audio', 'Áudio do testemunho (endereço do ficheiro)', 'text', '', 'Ficheiro publicado com a página ou URL; ou carregue um .m4a/.mp4 abaixo.'],
    ['pci', 'testimony_credit', 'Créditos e consentimento', 'textarea', ''],
    ['dig', 'viewer_url', 'Visualizador 3D (oEmbed)', 'url', 'edm:isShownBy', 'Ex.: https://sketchfab.com/models/…/embed'],
    ['dig', 'viewer_page', 'Página pública do modelo 3D', 'url', ''],
    ['dig', 'glb_url', 'Ficheiro 3D (URL estável)', 'url', 'edm:WebResource'],
    ['dig', 'model_type', 'Tipo de modelo 3D', 'select:MODEL_TYPES', 'dc:type'],
    ['dig', 'polygons', 'N.º de polígonos', 'number', 'edm:polygonCount'],
    ['dig', 'vertices', 'N.º de vértices', 'number', 'edm:vertexCount'],
    ['dig', 'intended_usage', 'Finalidade da digitalização', 'select:USAGES', 'edm:intendedUsage'],
    ['dig', 'digitiser', 'Autoria da digitalização', 'text', 'dc:creator'],
    ['dig', 'capture_note', 'Captação e processamento', 'textarea', ''],
    ['dig', 'paradata_url', 'Paradados – URL', 'url', 'rdfs:seeAlso'],
    ['dig', 'thumb_url', 'Miniatura – URL estável', 'url', 'edm:object'],
    ['eu', 'rights', 'Declaração de direitos', 'select:RIGHTS', 'edm:rights', 'Decisão do Município. Sem ela o registo não pode ser submetido.'],
    ['eu', 'data_provider', 'Fornecedor dos dados', 'text', 'edm:dataProvider'],
    ['eu', 'provider', 'Agregador', 'text', 'edm:provider'],
    ['eu', 'shown_at', 'Página do objeto (URL estável)', 'url', 'edm:isShownAt'],
    ['eu', 'status', 'Estado do registo', 'select:STATUS', ''],
    ['eu', 'notes', 'Observações internas', 'textarea', '']
  ];
  var VOCAB = { UNESCO: [''].concat(UNESCO), MODEL_TYPES: MODEL_TYPES, USAGES: USAGES, STATUS: STATUS, CONDITION: CONDITION };
  var DEFAULTS = { status: 'Rascunho', data_provider: 'Município de Vimioso – Museu Etnográfico da Casa da Cultura de Vimioso', lot: 'Lote 1', location_uri: 'https://sws.geonames.org/2732289/' };

  // ---------- Helpers ----------
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function xe(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function has(v) { return v !== undefined && v !== null && String(v).trim() !== ''; }
  function rightsLabel(u) { for (var i = 0; i < RIGHTS.length; i++) if (RIGHTS[i][0] === u) return RIGHTS[i][1]; return u; }
  function rightsTier(u) { for (var i = 0; i < RIGHTS.length; i++) if (RIGHTS[i][0] === u) return RIGHTS[i][2]; return 0; }
  function imgSrc(img) { if (!img) return ''; return img.src || ''; }
  function docId(inv) { return String(inv || '').trim().replace(/[^A-Za-z0-9_\-.~:@+]/g, '_'); }
  function extent(o) {
    var p = []; function n(v) { return String(v).replace('.', ','); }
    if (has(o.height)) p.push('Altura ' + n(o.height) + ' cm');
    if (has(o.width)) p.push('largura ' + n(o.width) + ' cm');
    if (has(o.depth)) p.push('profundidade ' + n(o.depth) + ' cm');
    if (has(o.weight)) p.push('peso ' + n(o.weight) + ' g');
    return p.join('; ');
  }

  // ---------- Europeana readiness ----------
  function assess(o) {
    var c = [];
    function chk(ok, label, level) { c.push({ ok: !!ok, label: label, level: level || 'req' }); }
    chk(has(o.inv), 'Identificador (dc:identifier)');
    chk(has(o.title_pt) || has(o.desc_pt), 'Título ou descrição');
    chk(has(o.type_pt) || has(o.ich_domain) || has(o.provenance_pt) || has(o.date), 'Tipo, assunto, local ou data');
    chk(has(o.rights), 'Declaração de direitos (edm:rights)');
    chk(has(o.data_provider), 'Fornecedor dos dados');
    chk(has(o.provider), 'Agregador (edm:provider)');
    chk(has(o.shown_at) || has(o.viewer_url), 'Página ou visualizador do objeto');
    chk(has(o.thumb_url), 'Miniatura em URL estável (edm:object)', 'rec');
    chk(has(o.title_en) || has(o.desc_en), 'Título ou descrição em inglês', 'rec');
    // Metadata tier (estimate)
    var groups = { time: 0, subj: 0, agent: 0, place: 0 };
    if (has(o.date)) groups.time++; if (has(o.period)) groups.time++;
    if (has(o.type_pt) || has(o.type_uri)) groups.subj++; if (has(o.ich_domain) || has(o.ich_core)) groups.subj++; if (has(o.material_pt)) groups.subj++;
    if (has(o.creator)) groups.agent++;
    if (has(o.provenance_pt) || has(o.place_uri)) groups.place++; if (has(o.location_uri)) groups.place++;
    var nEl = groups.time + groups.subj + groups.agent + groups.place;
    var nGroups = ['time', 'subj', 'agent', 'place'].filter(function (k) { return groups[k] > 0; }).length;
    var en = nEl >= 4 && nGroups >= 2 ? 'C' : nEl >= 3 && nGroups >= 2 ? 'B' : nEl >= 1 ? 'A' : '0';
    var lod = ['type_uri', 'material_uri', 'place_uri', 'creator_uri', 'ich_domain_uri', 'ich_core_uri', 'location_uri'].filter(function (k) { return has(o[k]); }).length;
    var ctx = lod >= 2 ? 'C' : lod >= 1 ? 'B' : 'A';
    var lang = 'C'; // every text field is written with a language tag
    var order = { '0': 0, A: 1, B: 2, C: 3 };
    var meta = [en, ctx, lang].sort(function (a, b) { return order[a] - order[b]; })[0];
    // Content tier for 3D
    var ct = 0;
    if (has(o.rights)) {
      if (has(o.shown_at) && has(o.thumb_url)) ct = 1;
      if (ct >= 1 && has(o.viewer_url) && has(o.intended_usage)) ct = 2;
      if (ct >= 2 && has(o.glb_url) && has(o.model_type) && has(o.polygons) && rightsTier(o.rights) >= 3) ct = 3;
      if (ct === 3 && rightsTier(o.rights) >= 4) ct = 4;
    }
    var req = c.filter(function (x) { return x.level === 'req'; });
    var okReq = req.filter(function (x) { return x.ok; }).length;
    return { checks: c, okReq: okReq, totalReq: req.length, meta: meta, content: ct, lod: lod, nEl: nEl, nGroups: nGroups, submittable: okReq === req.length };
  }

  // ---------- EDM XML ----------
  function edm(o) {
    var id = '#' + docId(o.inv);
    var L = [];
    function lit(tag, v, lang) { if (has(v)) L.push('    <' + tag + (lang ? ' xml:lang="' + lang + '"' : '') + '>' + xe(v) + '</' + tag + '>'); }
    function res(tag, v) { if (has(v)) L.push('    <' + tag + ' rdf:resource="' + xe(v) + '"/>'); }
    L.push('<?xml version="1.0" encoding="UTF-8"?>');
    L.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"');
    L.push('    xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:edm="http://www.europeana.eu/schemas/edm/"');
    L.push('    xmlns:ore="http://www.openarchives.org/ore/terms/" xmlns:skos="http://www.w3.org/2004/02/skos/core#"');
    L.push('    xmlns:svcs="http://rdfs.org/sioc/services#" xmlns:schema="http://schema.org/">');
    L.push('  <edm:ProvidedCHO rdf:about="' + xe(id) + '">');
    lit('dc:identifier', o.inv);
    lit('dc:title', o.title_pt, 'pt'); lit('dc:title', o.title_en, 'en');
    var d = [o.desc_pt, o.decoration].filter(has).join(' ');
    lit('dc:description', d, 'pt'); lit('dc:description', o.desc_en, 'en');
    lit('dc:type', o.type_pt, 'pt'); res('dc:type', o.type_uri);
    lit('dc:format', o.technique, 'pt');
    lit('dcterms:medium', o.material_pt, 'pt'); res('dcterms:medium', o.material_uri);
    lit('dcterms:extent', extent(o), 'pt');
    lit('dc:subject', o.ich_domain, 'pt'); res('dc:subject', o.ich_domain_uri);
    lit('dc:subject', o.ich_core, 'pt'); res('dc:subject', o.ich_core_uri);
    lit('dc:subject', o.ich_uses, 'pt');
    lit('dc:creator', o.creator, 'pt'); res('dc:creator', o.creator_uri);
    lit('dc:date', o.date); lit('dcterms:temporal', o.period, 'pt');
    lit('dcterms:spatial', o.provenance_pt, 'pt'); res('dcterms:spatial', o.place_uri);
    res('edm:currentLocation', o.location_uri);
    lit('dcterms:isReferencedBy', o.testimony_ref, 'pt');
    lit('dcterms:isPartOf', o.lot ? 'Museu Etnográfico da Casa da Cultura de Vimioso – ' + o.lot : '', 'pt');
    L.push('    <edm:type>' + (has(o.viewer_url) || has(o.glb_url) ? '3D' : 'IMAGE') + '</edm:type>');
    L.push('  </edm:ProvidedCHO>');
    if (has(o.viewer_url)) {
      L.push('  <edm:WebResource rdf:about="' + xe(o.viewer_url) + '">');
      if (/sketchfab\.com/.test(o.viewer_url)) res('svcs:has_service', 'https://sketchfab.com/oembed');
      res('edm:rights', o.rights);
      L.push('  </edm:WebResource>');
    }
    if (has(o.glb_url) || has(o.model_type)) {
      L.push('  <edm:WebResource rdf:about="' + xe(o.glb_url || '[URL do ficheiro 3D]') + '">');
      lit('dc:type', o.model_type);
      res('schema:digitalSourceType', 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture');
      lit('edm:polygonCount', o.polygons); lit('edm:vertexCount', o.vertices);
      lit('edm:intendedUsage', o.intended_usage);
      lit('dc:creator', o.digitiser, 'pt');
      res('rdfs:seeAlso', o.paradata_url); res('edm:rights', o.rights);
      L.push('  </edm:WebResource>');
    }
    if (/sketchfab\.com/.test(o.viewer_url || '')) {
      L.push('  <svcs:Service rdf:about="https://sketchfab.com/oembed">');
      L.push('    <dcterms:conformsTo rdf:resource="https://oembed.com/"/>');
      L.push('  </svcs:Service>');
    }
    L.push('  <ore:Aggregation rdf:about="' + xe(id + '-aggregation') + '">');
    L.push('    <edm:aggregatedCHO rdf:resource="' + xe(id) + '"/>');
    lit('edm:dataProvider', o.data_provider);
    if (has(o.provider)) lit('edm:provider', o.provider); else L.push('    <!-- edm:provider: [agregador por definir] -->');
    res('edm:isShownBy', o.viewer_url); res('edm:isShownAt', o.shown_at); res('edm:object', o.thumb_url);
    if (has(o.rights)) res('edm:rights', o.rights); else L.push('    <!-- edm:rights: [declaração de direitos por decidir] -->');
    L.push('  </ore:Aggregation>');
    L.push('</rdf:RDF>');
    return L.join('\n');
  }


  function row(label, value, uri) {
    if (!has(value) && !has(uri)) return '';
    return '<dt>' + esc(label) + '</dt><dd>' + esc(value || '') + (has(uri) ? '<span class="uri">' + esc(uri) + '</span>' : '') + '</dd>';
  }
  function load() {
    return fetch('objects.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  return { F: F, SECTIONS: SECTIONS, RIGHTS: RIGHTS, esc: esc, has: has, extent: extent, assess: assess, edm: edm, rightsLabel: rightsLabel, imgSrc: imgSrc, docId: docId, row: row, load: load };
})();

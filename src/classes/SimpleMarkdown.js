export default class SimpleMarkdown {

  static md2htmlOneLine(line) {

    // PRE
    if (line.substr(0, 3) == '```') {
        return '<pre>' + line.replace(/\`/gm, '') + '</pre>';
    }
    if (line.substr(0, 15) == '&#39;&#39;&#39;') {
        line = '<pre>' + line.substr(15) + '</pre>';
    }

    // Bold
    line = line.replace(/(\*\*[^\*]+\*\*)/gm, function(s) {
        return '<b>' + s.substr(2, s.length - 4) + '</b>';
    });

    // Italic
    line = line.replace(/(\*[^\*]+\*)/gm, function(s) {
        return '<i>' + s.substr(1, s.length - 2) + '</i>';
    });

    // Headlines
    if (line.substr(0, 1) == '#') {
      if (line.substr(0, 2) == '# ') {
          line = '<h1>' + line.substr(2) + '</h1>';
      }
      if (line.substr(0, 3) == '## ') {
          line = '<h2>' + line.substr(3) + '</h2>';
      }
      if (line.substr(0, 4) == '### ') {
          line = '<h3>' + line.substr(4) + '</h3>';
      }
      if (line.substr(0, 5) == '#### ') {
          line = '<h4>' + line.substr(5) + '</h4>';
      }
    }

    // Italic
    line = line.replace(/\[([^[]+)\]\(([^)]+)\)/gm, function(s, p1, p2) {
      return '<a target="blank" href="' + p2 + '">' + p1 + '</a>';
    });

    // Empty line
    if (line == '') {
        line = '<br>';
    }
    return line;
  }

  static md2html(md) {
    var arr = md.match(/[^\r\n]+/g);
    var result = [];
    for (var i=0; i<arr.length; i++) {
      result.push(SimpleMarkdown.md2htmlOneLine(arr[i]));
    }
    return result.join('');
  }
}

from pathlib import Path
root=Path(__file__).resolve().parents[2]
p=root/'what-happens-to-a-moment.html'
s=p.read_text();a=s.index('<script>');b=s.rindex('</script>')
s=s[:a]+'<script>\n'+(root/'src/moment/simulation.js').read_text()+'\n'+(root/'src/moment/architecture-v2.js').read_text()+'\n'+(root/'src/moment/state-machine-v2.js').read_text()+'\n'+(root/'src/moment/endings-v2.js').read_text()+'\n'+(root/'src/moment/political-world-v2.js').read_text()+'\n'+(root/'src/moment/presentation.js').read_text()+'\n'+(root/'src/moment/newsroom.js').read_text()+'\n'+(root/'src/moment/pressure.js').read_text()+'\nresetGame();\n</script>'+s[b+9:];p.write_text(s)

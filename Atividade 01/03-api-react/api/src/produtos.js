// Os mesmos produtos das outras arquiteturas, agora só como dados (JSON).
// Aqui não existe HTML nenhum: a API entrega DADOS, e quem monta a tela é o React.
export const produtos = [
  { id: 1, nome: "Teclado Mecânico RGB",     preco: 349.9,  categoria: "Periféricos", emoji: "⌨️", descricao: "Switches azuis, layout ABNT2 e iluminação RGB personalizável.", estoque: 24 },
  { id: 2, nome: "Mouse Gamer 16000 DPI",    preco: 199.9,  categoria: "Periféricos", emoji: "🖱️", descricao: "Sensor óptico de 16000 DPI e 7 botões programáveis.", estoque: 40 },
  { id: 3, nome: 'Monitor 27" 144Hz',        preco: 1499.0, categoria: "Monitores",   emoji: "🖥️", descricao: "Painel IPS Full HD, 144Hz e 1ms de resposta.", estoque: 12 },
  { id: 4, nome: "Headset 7.1 Surround",     preco: 279.9,  categoria: "Áudio",       emoji: "🎧", descricao: "Som surround 7.1 e microfone com cancelamento de ruído.", estoque: 30 },
  { id: 5, nome: "Webcam Full HD 1080p",     preco: 189.9,  categoria: "Vídeo",       emoji: "📷", descricao: "Gravação em 1080p a 30fps com foco automático.", estoque: 18 },
  { id: 6, nome: "Cadeira Gamer Ergonômica", preco: 1199.0, categoria: "Mobiliário",  emoji: "🪑", descricao: "Reclinável até 180°, apoio lombar e couro sintético.", estoque: 8 },
];

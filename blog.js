    const botonEnviar = document.getElementById('botonEnviar');
    const nuevoPost = document.getElementById('nuevoPost');
    const contenedorPost = document.getElementById('postBlog');

    botonEnviar.addEventListener('click', () => {
      const texto = nuevoPost.value.trim();
      if(texto) {
    
        const nuevoComentario = document.createElement('p');
        nuevoComentario.textContent = texto;
        nuevoComentario.style.borderBottom = '0.1rem solid var(--clr-main)';
        nuevoComentario.style.padding = '5px 0';
        nuevoComentario.style.fontFamily = 'Fredoka';
        nuevoComentario.style.fontStyle = 'italic';
        nuevoComentario.style.fontSize = 'large';
        


        contenedorPost.appendChild(nuevoComentario);


        nuevoPost.value = '';


        contenedorPost.scrollTop = contenedorPost.scrollHeight;
      } else {
        alert('Por favor, escribe un comentario antes de enviar.');
      }
    });

 
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const type = document.getElementById('type').value;
            
            if (!name || !email || !phone || !type) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            // Simulación de envío
            console.log('Datos del formulario:', {
                name: name,
                email: email,
                phone: '+52 ' + phone,
                type: type,
                comments: document.getElementById('comments').value
            });
            
            alert('¡Gracias por tu mensaje! Uno de nuestros asesores se pondrá en contacto contigo en menos de 24 horas.');
            contactForm.reset();
        });
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Formateo automático del teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substring(0, 10);
            if (value.length >= 6) value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            else if (value.length >= 3) value = value.replace(/(\d{3})(\d{0,3})/, '$1-$2');
            e.target.value = value;
        });
    }

    // Parallax dinámico del formulario
    const formSection = document.querySelector('.contacto-formulario');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if(formSection){
            formSection.style.transform = `translateY(${scrollY * -0.1}px)`;
        }
    });
});

function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    // Store in local storage
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = 'Message sent successfully! We will review it and get back to you soon.';
    messageDiv.className = 'form-message success';
    messageDiv.style.display = 'block';

    // Reset form
    document.getElementById('contactForm').reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);

    return false;
} 
document.getElementById('phone').addEventListener('input', function(event) {
    // Replace anything that's not a digit with an empty string
    this.value = this.value.replace(/\D/g, '');
});

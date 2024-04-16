const resetPasswordForm = document.getElementById('resetPasswordForm');

resetPasswordForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const Username = document.getElementById('Username').value;
    const Password = document.getElementById('Password').value;
    const newPassword = document.getElementById('newPassword').value;

    // You may want to add validation logic here

    const success = await resetPassword(Username, Password, newPassword);

    if (success) {
        alert('Password reset successfully!');
        // Redirect user to login page or any other appropriate page
        window.location.href = 'index.html';
    } else {
        alert('Failed to reset password. Please check your inputs.');
    }
});

async function resetPassword(Username, Password, newPassword) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Username: Username,
            Password: Password,
            newPassword: newPassword
        }),
        method: 'POST',
    };

    try {
        const response = await fetch('/resetpassword', options);
        if (response.ok) {
            return true; // Password reset successful
        } else {
            const errorMessage = await response.text();
            console.error('Password reset failed:', errorMessage);
            return false; // Password reset failed
        }
    } catch (error) {
        console.error('An error occurred while resetting password:', error);
        return false; // Password reset failed due to an error
    }
}

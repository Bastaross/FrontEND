const form = document.getElementById('searchForm');
const resultDiv = document.getElementById('result');
const showuserbutton = document.getElementById('showusersbutton')

// Événement lorsque le formulaire est soumis
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const userId = document.getElementById('userId').value;

    try {
        // Appeler l'API pour récupérer les données de l'utilisateur
        const response = await fetch(`https://backend-8wom.onrender.com/user/${userId}`);
        
        if (response.ok) {
            const user = await response.json();
            resultDiv.textContent = `Nom : ${user.nom}, Prénom : ${user.prenom}`;
        } else {
            const error = await response.json();
            resultDiv.textContent = error.message;
        }
    } catch (error) {
        console.error('Erreur lors de la requête API :', error);
        resultDiv.textContent = 'Erreur de connexion au serveur.';
    }
});

showuserbutton.addEventListener('click', async () => {
    try{
        const response = await fetch('https://backend-8wom.onrender.com/users');
        if (response.ok) {
            const users = await response.json();
            resultDiv.innerHTML = `
                <ul>
                    ${users.map(user => `<li>${user.nom} ${user.prenom}</li>`).join('')}
                </ul>
            `;
        }
        else {
            resultDiv.textContent = 'Impossible de récupérer la liste de tous les users.'
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération des membres :', error);
        membersList.textContent = 'Erreur de connexion au serveur.';
    }
});

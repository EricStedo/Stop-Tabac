// Données de l'application
let appData = {
    todayCount: 0,
    dailyObjective: 8,
    weekData: [5, 7, 6, 8, 7, 9, 6], // Lun, Mar, Mer, Jeu, Ven, Sam, Dim
    startDate: new Date(),
    cigarettePrice: 0.5, // Prix par cigarette
    dailyConsumption: 20 // Cigarettes par jour avant arrêt
};

// Messages motivationnels
const motivationalQuotes = [
    "Chaque cigarette non fumée est une victoire sur vous-même.",
    "Votre santé vaut plus que n'importe quelle cigarette.",
    "Chaque jour sans tabac vous rapproche de la liberté.",
    "Vous êtes plus fort que votre envie de fumer.",
    "Votre futur vous remerciera pour chaque cigarette évitée.",
    "Avec PAUSE, vous avez tous les outils pour réussir.",
    "La méthode PAUSE vous accompagne vers une vie sans tabac."
];

// Conseils d'urgence
const emergencyTips = [
    "Respirez profondément 10 fois. L'envie va passer.",
    "Buvez un grand verre d'eau et patientez 5 minutes.",
    "Sortez prendre l'air ou faites quelques pas.",
    "Appelez un proche qui vous soutient dans votre démarche.",
    "Pensez à tout l'argent que vous économisez chaque jour.",
    "Rappelez-vous pourquoi vous avez décidé d'arrêter.",
    "Mâchez un chewing-gum ou brossez-vous les dents.",
    "Utilisez les techniques de respiration PAUSE pour vous calmer."
];

// Initialiser l'application
function initApp() {
    updateTodayDisplay();
    updateWeekChart();
    updateProgress();
    updateSavings();
    updateMotivationalQuote();
}

// Ajouter une cigarette
function addCigarette() {
    appData.todayCount++;
    updateTodayDisplay();
    updateProgress();
    updateDailyMessage();
    
    // Vibration si supportée
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

// Mettre à jour l'affichage du jour
function updateTodayDisplay() {
    document.getElementById('todayCount').textContent = appData.todayCount;
    document.getElementById('dailyObjective').textContent = appData.dailyObjective;
}

// Mettre à jour le graphique de la semaine
function updateWeekChart() {
    const chart = document.getElementById('weekChart');
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const maxValue = Math.max(...appData.weekData);
    
    chart.innerHTML = '';
    
    appData.weekData.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 160}px`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = `${days[index]}\n(${value})`;
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'bar-value';
        valueLabel.textContent = value;
        
        bar.appendChild(label);
        bar.appendChild(valueLabel);
        chart.appendChild(bar);
    });
}

// Mettre à jour la progression
function updateProgress() {
    const percentage = Math.min((appData.todayCount / appData.dailyObjective) * 100, 100);
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (percentage / 100) * circumference;
    
    document.getElementById('progressCircle').style.strokeDasharray = `${circumference} ${circumference}`;
    document.getElementById('progressCircle').style.strokeDashoffset = offset;
    document.getElementById('progressText').textContent = `${Math.round(percentage)}%`;
}

// Mettre à jour le message quotidien
function updateDailyMessage() {
    const messageDiv = document.getElementById('dailyMessage');
    
    if (appData.todayCount <= appData.dailyObjective) {
        messageDiv.innerHTML = `<p style="color: #4ecdc4;">👏 Bravo, vous êtes sous votre objectif grâce à PAUSE !</p>`;
    } else {
        const excess = appData.todayCount - appData.dailyObjective;
        messageDiv.innerHTML = `<p style="color: #f39c12;">⚠️ ${excess} cigarette(s) de plus que prévu. PAUSE vous aide à faire mieux demain !</p>`;
    }
}

// Mettre à jour les économies
function updateSavings() {
    const daysCount = Math.floor((new Date() - appData.startDate) / (1000 * 60 * 60 * 24)) + 1;
    const cigarettesAvoided = (appData.dailyConsumption * daysCount) - getTotalCigarettes();
    const totalSavings = cigarettesAvoided * appData.cigarettePrice;
    const dailySavings = (appData.dailyConsumption - appData.todayCount) * appData.cigarettePrice;
    const packsAvoided = Math.floor(cigarettesAvoided / 20);
    
    document.getElementById('totalSavings').textContent = `${Math.max(0, totalSavings).toFixed(2)}€`;
    document.getElementById('dailySavings').textContent = `${Math.max(0, dailySavings).toFixed(2)}€`;
    document.getElementById('packsAvoided').textContent = Math.max(0, packsAvoided);
}

// Calculer le total de cigarettes
function getTotalCigarettes() {
    return appData.weekData.reduce((a, b) => a + b, 0) + appData.todayCount;
}

// Mettre à jour la citation motivationnelle
function updateMotivationalQuote() {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    document.getElementById('motivationalQuote').textContent = `"${randomQuote}"`;
}

// Afficher les onglets
function showTab(tabName) {
    // Masquer tous les contenus
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activer l'onglet et le contenu sélectionnés
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Afficher l'aide d'urgence
function showEmergencyHelp() {
    const randomTip = emergencyTips[Math.floor(Math.random() * emergencyTips.length)];
    document.getElementById('emergencyTip').textContent = randomTip;
    document.getElementById('emergencyModal').style.display = 'block';
}

// Fermer la modal d'urgence
function closeEmergencyModal() {
    document.getElementById('emergencyModal').style.display = 'none';
}

// Fermer la modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('emergencyModal');
    if (event.target === modal) {
        closeEmergencyModal();
    }
}

// Initialiser l'application au chargement
window.onload = function() {
    initApp();
    // Mettre à jour les citations toutes les 30 secondes
    setInterval(updateMotivationalQuote, 30000);
};
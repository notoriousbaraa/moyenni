const subjects = [
    { name: "Principe de Gestion", coeff: 2.5 },
    { name: "Comptabilité", coeff: 2.5 },
    { name: "Math Analyse", coeff: 2.5 },
    { name: "Microéconomie", coeff: 2.5 },
    { name: "Math Fin", coeff: 1.5 },
    { name: "Compétences Digitales", coeff: 1.5 },
    { name: "Droit", coeff: 1 },
    { name: "Compétences Linguistiques", coeff: 1 }
];

const weights = {
    examen: 0.7,
    ds: 0.2,
    oral: 0.1
};

// Créer les champs d'input dynamiquement
const subjectsContainer = document.querySelector("#subjects tbody");
const fragment = document.createDocumentFragment();

subjects.forEach(subject => {
    const row = document.createElement("tr");

    const subjectNameCell = document.createElement("td");
    subjectNameCell.textContent = subject.name;
    row.appendChild(subjectNameCell);

    // Examen input
    const examenCell = document.createElement("td");
    const inputExamen = document.createElement("input");
    inputExamen.type = "number";
    inputExamen.placeholder = "0-20";
    inputExamen.classList.add("subject-input");
    inputExamen.dataset.coeff = subject.coeff;
    inputExamen.dataset.type = "examen";
    examenCell.appendChild(inputExamen);
    row.appendChild(examenCell);

    // DS input
    const dsCell = document.createElement("td");
    const inputDS = document.createElement("input");
    inputDS.type = "number";
    inputDS.placeholder = "0-20";
    inputDS.classList.add("subject-input");
    inputDS.dataset.coeff = subject.coeff;
    inputDS.dataset.type = "ds";
    dsCell.appendChild(inputDS);
    row.appendChild(dsCell);

    // Oral input
    const oralCell = document.createElement("td");
    const inputOral = document.createElement("input");
    inputOral.type = "number";
    inputOral.placeholder = "0-20";
    inputOral.classList.add("subject-input");
    inputOral.dataset.coeff = subject.coeff;
    inputOral.dataset.type = "oral";
    oralCell.appendChild(inputOral);
    row.appendChild(oralCell);

    // Moyenne cell
    const moyenneCell = document.createElement("td");
    moyenneCell.classList.add("moyenne");
    row.appendChild(moyenneCell);

    // Contribution cell
    const contributionCell = document.createElement("td");
    contributionCell.classList.add("contribution");
    row.appendChild(contributionCell);

    fragment.appendChild(row);
});

subjectsContainer.appendChild(fragment);

// Fonction de calcul de la moyenne pondérée
function calculerMoyenne() {
    let totalPoints = 0;
    let totalCoeffs = 0;

    document.querySelectorAll("tr").forEach(row => {
        const inputs = row.querySelectorAll(".subject-input");
        if (inputs.length > 0) {
            const [inputExamen, inputDS, inputOral] = inputs;
            const coeff = parseFloat(inputExamen.dataset.coeff);

            const examen = parseFloat(inputExamen.value) || 0;
            const ds = parseFloat(inputDS.value) || 0;
            const oral = parseFloat(inputOral.value) || 0;

            // Calculer la moyenne de la matière
            const moyenneMatiere = (examen * weights.examen) + (ds * weights.ds) + (oral * weights.oral);
            
            // Afficher la moyenne de la matière dans le tableau
            row.querySelector(".moyenne").textContent = moyenneMatiere.toFixed(2);

            // Calculer la contribution
            const contribution = moyenneMatiere * coeff;
            row.querySelector(".contribution").textContent = contribution.toFixed(2);

            // Ajouter à la somme des contributions
            totalPoints += contribution;
            totalCoeffs += coeff;
        }
    });

    // Calculer la moyenne finale
    const moyenneFinale = totalPoints / totalCoeffs;
    const validation = moyenneFinale >= 10 ? "✅ Validé" : "❌ Non Validé";
    document.getElementById("result").innerText = `Moyenne du semestre : ${moyenneFinale.toFixed(2)} - ${validation}`;
}

// Validation des entrées pour vérifier qu'elles sont dans la plage 0-20
document.querySelectorAll(".subject-input").forEach(input => {
    input.addEventListener("input", () => {
        if (input.value < 0 || input.value > 20) {
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "";
        }
    });
});

// Sauvegarder les données dans le localStorage
function saveData() {
    const inputs = document.querySelectorAll(".subject-input");
    const data = {};
    inputs.forEach(input => {
        data[input.dataset.type] = input.value;
    });
    localStorage.setItem('semesterData', JSON.stringify(data));
}

// Charger les données depuis le localStorage au chargement de la page
function loadData() {
    const savedData = JSON.parse(localStorage.getItem('semesterData'));
    if (savedData) {
        document.querySelectorAll(".subject-input").forEach(input => {
            input.value = savedData[input.dataset.type] || '';
        });
    }
}

// Charger les données au chargement de la page
loadData();

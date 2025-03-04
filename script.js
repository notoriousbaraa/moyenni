const subjects = [
    { name: "Principe de Gestion", coeff: 2.5 },
    { name: "Comptabilité", coeff: 2.5 },
    { name: "Microéconomie", coeff: 2.5 },
    { name: "Math Analyse", coeff: 2.5 },
    { name: "Droit", coeff: 1 },
    { name: "Math Fin", coeff: 1.5 },
    { name: "Compétences Linguistiques", coeff: 1 },
    { name: "Compétences Digitales", coeff: 1.5 }
];

const weights = { examen: 0.7, ds: 0.2, oral: 0.1 };

const subjectsContainer = document.querySelector("#subjects tbody");
const fragment = document.createDocumentFragment();

subjects.forEach(subject => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${subject.name}</td>
        <td><input type="number" class="subject-input" data-coeff="${subject.coeff}" data-type="examen" placeholder="0-20"></td>
        <td><input type="number" class="subject-input" data-coeff="${subject.coeff}" data-type="ds" placeholder="0-20"></td>
        <td><input type="number" class="subject-input" data-coeff="${subject.coeff}" data-type="oral" placeholder="0-20"></td>
        <td class="moyenne-cell"></td>
    `;
    fragment.appendChild(row);
});

subjectsContainer.appendChild(fragment);

function calculerMoyenne() {
    let totalMoyenne = 0;
    let totalCoefficients = 0;

    document.querySelectorAll("tr").forEach(row => {
        const inputs = row.querySelectorAll(".subject-input");
        if (inputs.length) {
            const [examen, ds, oral] = [...inputs].map(input => parseFloat(input.value) || 0);
            const coeff = parseFloat(inputs[0].dataset.coeff);

            const moyenne = (examen * weights.examen) + (ds * weights.ds) + (oral * weights.oral);
            row.querySelector(".moyenne-cell").textContent = moyenne.toFixed(2);

            totalMoyenne += moyenne * coeff;
            totalCoefficients += coeff;
        }
    });

    const finalAverage = totalMoyenne / totalCoefficients;
    document.querySelector("#finalMoyenne").textContent = `Moyenne Finale: ${finalAverage.toFixed(2)}`;
}

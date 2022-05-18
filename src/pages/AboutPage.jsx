import '../styles/AboutPage.css';

import Header from "../components/header";

function AboutPage() {
    return (
        <div>
            <Header/>
            Dans le cadre de l’UV à projet DS50 de la filière-métier Data Science, nous avons effectué un projet sur l’évaluation de méthodes de classification de données.
            En se basant sur un jeu de données concernant des panneaux solaires situés dans différentes zones de l’Angleterre, nous avons dans un premier temps testé différents modèles permettant de prédire la production en fonction de paramètres météorologiques divers et les avons entraîné afin d’obtenir un modèle ayant une précision satisfaisante.
            Ensuite, nous avons couplé notre modèle avec une API permettant de récupérer des données météorologiques de n’importe quel endroit, et avons ainsi pu produire un outil permettant de prédire une production d’électricité solaire à partir d’une donnée géographique.
        </div>
    );
}

export default AboutPage;

        let isLoggedIn = false;
        let currentUser = null;

        // Anmeldestatus prüfen
        function checkLoginStatus() {
            const userData = JSON.parse(localStorage.getItem('solarSystemUser') || 'null');
            if (userData) {
                isLoggedIn = true;
                currentUser = userData;
                return true;
            }
            return false;
        }

        // Quiz-Formular Event Listener
        document.getElementById('quiz-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Prüfen ob angemeldet
            if (!checkLoginStatus()) {
                // Zur Anmeldeseite weiterleiten
                window.open('anmeldung.html', '_blank');
                return;
            }
            
            // Quiz auswerten
            evaluateQuiz();
        });

        function evaluateQuiz() {
            const answers = {
                q1: 'merkur',
                q2: 'mars', 
                q3: 'jupiter',
                q4: 'saturn',
                q5: '8'
            };
            
            let score = 0;
            let totalQuestions = 5;
            
            // Antworten überprüfen
            for (let question in answers) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === answers[question]) {
                    score++;
                }
            }
            
            // Ergebnis anzeigen
            showResult(score, totalQuestions);
        }

        function showResult(score, total) {
            const percentage = (score / total) * 100;
            let message = '';
            
            if (percentage === 100) {
                message = `🌟 Perfekt! Du hast alle ${score} von ${total} Fragen richtig beantwortet! Du bist ein wahrer Weltraum-Experte! 🚀`;
            } else if (percentage >= 80) {
                message = `🎉 Sehr gut! Du hast ${score} von ${total} Fragen richtig beantwortet! Du kennst dich super mit den Planeten aus! 🌍`;
            } else if (percentage >= 60) {
                message = `👍 Gut gemacht! Du hast ${score} von ${total} Fragen richtig beantwortet! Mit etwas mehr Übung wirst du zum Planeten-Profi! 🌙`;
            } else {
                message = `💫 Du hast ${score} von ${total} Fragen richtig beantwortet. Keine Sorge - erkunde unsere Planetenseiten und versuche es nochmal! 🌌`;
            }
            
            document.getElementById('result-text').innerHTML = message;
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('quiz-result').style.display = 'block';
        }

        function restartQuiz() {
            // Formular zurücksetzen
            document.getElementById('quiz-form').reset();
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('quiz-result').style.display = 'none';
        }

        // Beim Laden der Seite prüfen ob angemeldet
        document.addEventListener('DOMContentLoaded', function() {
            if (checkLoginStatus()) {
                console.log('Benutzer angemeldet:', currentUser.name);
            }
        });
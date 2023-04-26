
'use strict';


// als erstes importieren wir das modul "readline", das teil von nodeJS ist.

const readline = require('readline');

// wir erstellen ein neues readline interface (eine schnittstelle unserer app, mit dem input und output der konsole)
//                                 konsolen input, konsolen output
// oder : Dann wird eine readline-Schnittstelle erstellt, die das Eingabe- und Ausgabestreams des aktuellen Prozesses verwendet. Dies ist erforderlich, um den Benutzer nach seinem Zug zu fragen und das Spielbrett auf dem Terminal auszugeben.

const rl = readline.createInterface(process.stdin, process.stdout);


let spieler = 'X';
// spielbrett ist eine 2D-Matrix, die das Tic-Tac-Toe-Spielbrett darstellt.
let spielbrett = 
// "Spielbrett" ist ein Array, das eine oder mehrere Arrays enthält, die jeweils eine Zeile des Spielbretts darstellen.
  [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// Die Funktion ausgabeFeld habe ich definiert, um das aktuelle Spielbrett auf dem Terminal auszugeben.

function ausgabeFeld() {
  // die "join()" Methode auf dieses Array angewendet, um die Elemente mit senkrechten Strichen zu verbinden
  console.log(spielbrett[0].join('|'));
  console.log('-+-+--+-');
  console.log(spielbrett[1].join('|'));
  console.log('-+-+--+-');
  console.log(spielbrett[2].join('|'));
}


function werGewinnt() {
  // prüfe die Reihen des Feldes anhand einer der for Methode / Iteration
   for (let i = 0; i < 3; i++) {
    if (spielbrett[i][0] === spieler /* hier wird die Einagbe/ X des spielers durch die Schleife geprüft und ob alle drei Zeilen einer Reihe das Symbol des Spielers haben */&& spielbrett[i][1] === spieler && spielbrett[i][2] === spieler) {
      return true;
    }
   }
  
  // nun die Säulen/Columns prüfen. der Code nur die Spalten des Spielbretts. Dazu wird eine Schleife verwendet, die die drei Spalten des Spielbretts durchläuft. Innerhalb der Schleife wird geprüft, ob alle drei Felder in der aktuellen Spalte mit dem Wert "player" übereinstimmen. Wenn ja, wird "true" zurückgegeben, was bedeutet, dass der Spieler gewonnen hat.

    for (let j = 0; j < 3; j++) {
    if (spielbrett[0][j] === spieler && spielbrett[1][j] === spieler && spielbrett[2][j] === spieler) {
      return true;
    }
  }


  // nun die Diagonale prüfung anhand der If Anweisung. 

  if (spielbrett[0][0] === spieler && spielbrett[1][1] === spieler && spielbrett[2][2] === spieler) {
    return true;
  }

  // Die erste Bedingung (if-Anweisung) überprüft, ob das Spielfeld an den Koordinaten [0][0], [1][1] und [2][2] (die erste Diagonale) denselben Wert wie player hat. Wenn dies der Fall ist, wird true zurückgegeben, was bedeutet, dass der Spieler gewonnen hat.


  // -----------------------------------------------
  // Die zweite Bedingung (if-Anweisung) überprüft, ob das Spielfeld an den Koordinaten [0][2], [1][1] und [2][0] (die andere Diagonale) denselben Wert wie player hat. Wenn dies der Fall ist, wird true zurückgegeben, was wiederum bedeutet, dass der Spieler gewonnen hat.

  if (spielbrett[0][2] === spieler && spielbrett[1][1] === spieler && spielbrett[2][0] === spieler) {
    return true;
  }
  
  return false;

  // sonst gewinnt niemand, da "false" ausgegeben wird und kein Spieler auf einer der Diagonalen gewinnt. 

  
}

// nächster step
  
function spielbeginnt() {
  
  /* Dieser Code definiert eine Funktion mit dem Namen "spielbeginnt()", die eine Eingabeaufforderung an den Benutzer sendet, um eine Position in einem Spiel einzugeben. Die Funktion verwendet die readline-Modul der Node.js Bibliothek, um die Eingabeaufforderung zu generieren und auf die Benutzereingabe zu warten. */
  rl.question(`So mein Freund ${spieler}, du bist an der Reihe, setze deinen Zug (z.B. 1,1): `,
    
    /* Die Eingabeaufforderung ist folgende: "So mein Freund ${spieler}, du bist an der Reihe, setze deinen Zug (z.B. 1,1):", wobei "{spieler}" durch eine Variable ersetzt wird, die den aktuellen Spieler darstellt. */
    
    (input) => {

      /* Nachdem der Benutzer seine Eingabe eingegeben hat, wird sie in Form eines Strings an eine Callback-Funktion weitergeleitet. Diese Callback-Funktion analysiert den eingegebenen String, indem sie ihn anhand eines Kommas trennt und dann die beiden Zahlen in separate Variablen "row" und "col" speichert. */
    const [row, col] = input.split(',');
    if (spielbrett[row - 1][col - 1] !== ' ') {
      console.log('Auf diesen Feld kannst du nichts setzen, konzentrier dich.');
      spielbeginnt();
      return;





      /*  */
      
    }
      /* spielbrett[row - 1][col - 1] = spieler; aktualisiert das Spielbrett */
    spielbrett[row - 1][col - 1] = spieler;
      ausgabeFeld();
      /* Anweisung ausgabeFeld(); gibt das aktualisierte Spielbrett auf der Konsole aus */
      // --------------------------------// 
      // dritte Anweisung if (werGewinnt()) {...} überprüft, ob einer der Spieler das Spiel gewonnen hat, indem die Funktion werGewinnt() aufgerufen wird
      if (werGewinnt()) {
      /* wenn hier festgestellt werden konnte ob jemand gewinnt wird eine Gratulationsnachricht ausgegeben */
        console.log(`Okay, Ausnahmsweise ${spieler} hast du heute mal gewonnen!`);
        /* Anweisungen rl.close(); und return; schließen das Lesen der Eingabe und beenden die Funktion. */
      rl.close();
      return;
    }




    /* Code beginnt mit einer Bedingung: if (spielbrett.flat().every((cell) => cell !== ' ')). Hier wird überprüft, ob jede Zelle des spielbrett Arrays ungleich einem leeren String (' ') ist. */ 

    if (spielbrett.flat().every((cell) => cell !== ' ')) {
      
      /* ----------------------------------------------------- */
      console.log('Heute gewinnt hier niemand!');
      /* Wenn dies der Fall ist, wird der Text 'Heute gewinnt hier niemand!' auf der Konsole ausgegeben */

      // ------------------------------
      rl.close(); /* die Methode rl.close() aufgerufen, um das readline-Interface zu schließen, das möglicherweise im vorherigen Code geöffnet wurde. Schließlich wird return verwendet, um die Ausführung der Funktion an dieser Stelle zu beenden. */
      return;
    }
      
      
    
    spieler = spieler === 'X' ? 'O' : 'X';
      spielbeginnt();
      /* Wenn die Bedingung nicht erfüllt ist, wird der Code fortgesetzt. Die nächste Zeile spieler = spieler === 'X' ? 'O' : 'X'; wechselt den aktuellen Spieler, indem sie den Wert von spieler auf 'O' setzt, wenn spieler gleich 'X' ist, und auf 'X', wenn spieler gleich 'O' ist.

 */  
  });
}
/* asynchrone Programmierung mit Callback-Funktionen */
ausgabeFeld();
spielbeginnt();
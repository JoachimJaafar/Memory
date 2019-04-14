var cpt = 0;
var nb_pairs = 0;
var nb_coups = 0;
var uneSeconde = false;
var chgmt_m2 = false;
var chgmt_m3 = false;
var mode_actuel = "";
var mode_comparaison = "";
var stock_img;
var stock_id;

function Tile(id, img) {
    "use strict";
    this.id = id;
    this.isRevealed = false;
    this.img_recto = "dos.png";
    this.img_verso = img;
}

Tile.prototype.display = function () {
    "use strict";
    var img = document.getElementById(this.id);
    if (!this.isRevealed) {
        img.src = this.img_recto;
        img.style.borderColor = "black";
    } else {
        img.src = this.img_verso;
        img.style.borderColor = "red";
    }
    img.onmouseover = function () {
        img.style.borderColor = "blue";
    }
    img.onmouseout = function () {
        img.style.borderColor = "black";
    }
};

Tile.prototype.flipTile = function () {
    "use strict";
    if (this.isRevealed) {
        this.isRevealed = false;
    } else {
        this.isRevealed = true;
    }
};

function flip(id) {
    "use strict";
    if (!partie_finie) {
        if (!uneSeconde) {
            if (!jeu.tiles[id].isRevealed) {
                if (cpt % 2 !== 0) {
                    jeu.tiles[id].flipTile();
                    jeu.tiles[id].display();
                    cpt = 0;
                    nb_coups += 1;
                    if (jeu.tiles[id].img_verso !== stock_img) {
                        uneSeconde = true;
                        setTimeout(function () {
                            pas_pair(id, stock_id);
                        }, 1000);
                    } else {
                        nb_pairs = nb_pairs + 1;
                        if (mode2) {
                            if (joueur1) {
                                score_j1 += 1;
                            } else {
                                score_j2 += 1;
                            }
                            if (score_j1 + score_j2 === 12) {
                                partie_finie = true;
                                if (score_j1 > score_j2) {
                                    alert("Partie terminée ! Le joueur 1 l'emporte avec " + score_j1 + " paires révélées !");
                                }
                                if (score_j2 > score_j1) {
                                    alert("Partie terminée ! Le joueur 2 l'emporte avec " + score_j2 + " paires révélées !");
                                }
                                if (score_j1 === score_j2) {
                                    alert("Partie terminée ! C'est une égalité !");
                                }
                            }
                            chgmt_m2 = true;
                            jeu.display();
                            chgmt_m2 = false;
                        }
                        if (mode3) {
                            if (joueur) {
                                score_j += 1;
                            } else {
                                score_ordi += 1;
                            }
                            if (score_j + score_ordi === 12) {
                                partie_finie = true;
                                if (score_j > score_ordi) {
                                    alert("Partie terminée ! Le joueur l'emporte avec " + score_j + " paires révélées !");
                                }
                                if (score_ordi > score_j) {
                                    alert("Partie terminée ! L'ordinateur l'emporte avec " + score_ordi + " paires révélées !");
                                }
                                if (score_j === score_ordi) {
                                    alert("Partie terminée ! C'est une égalité !");
                                }
                            }
                            chgmt_m3 = true;
                            jeu.display();
                            chgmt_m3 = false;
                        }
                    }
                }
                if (!jeu.tiles[id].isRevealed) {
                    jeu.tiles[id].flipTile();
                    jeu.tiles[id].display();
                    cpt = cpt + 1;
                    stock_img = jeu.tiles[id].img_verso;
                    stock_id = id;
                }
            }
        }
    }
}

function pas_pair(id, stock_id) {
    "use strict";
    uneSeconde = false;
    if (mode1) {
        mode_comparaison = 1;
    }
    if (mode2) {
        mode_comparaison = 2;
    }
    if (mode3) {
        mode_comparaison = 3;
    }
    if (mode_actuel === mode_comparaison) {
        if (mode2) {
            if (joueur1) {
                joueur1 = false;
                joueur2 = true;
                chgmt_m2 = true;
            }
            if (!joueur1 && chgmt_m2 === false) {
                joueur1 = true;
                joueur2 = false;
                chgmt_m2 = true;
            }
        }
        if (mode3) {
            if (joueur) {
                joueur = false;
                ordi = true;
                chgmt_m3 = true;
            }
            if (!joueur && chgmt_m3 === false) {
                joueur = true;
                ordi = false;
                chgmt_m3 = true;
            }
        }
        jeu.tiles[id].flipTile();
        jeu.tiles[id].display();
        jeu.tiles[stock_id].flipTile();
        jeu.tiles[stock_id].display();
        if (mode2) {
            jeu.display();
            chgmt_m2 = false;
        }
        if (mode3) { //Possibilités de bugs pour le mode contre l'ordinateur.
            if (joueur) {
                jeu.display();
                chgmt_m3 = false;
            }
            if (ordi) {
                chgmt_m3 = true;
                var board = document.getElementById("board");
                var i;
                var test = 0;
                var compar = test;
                var val_ordi = false;
                var aleat = randInt(29);
                for (i = 0; i < 2; i += 1) {
                    val_ordi = false;
                    aleat = randInt(29);
                    test = 0;
                    while (val_ordi === false) {
                        while (board.children[aleat].id === "") {
                            aleat = randInt(29);
                        }
                        if (aleat >= 6 || aleat <= 11) {
                            test = aleat - 1;
                        }
                        if (aleat >= 12 || aleat <= 17) {
                            test = aleat - 2;
                        }
                        if (aleat >= 18 || aleat <= 23) {
                            test = aleat - 3;
                        }
                        if (aleat >= 24 || aleat <= 29) {
                            test = aleat - 4;
                        }
                        if (compar === test || test < 0 || test === 5 || test === 11 || test === 17 || test === 23 || test >= 29) {
                            aleat = randInt(29);
                        } else {
                            if (!jeu.tiles[test].isRevealed) {
                                val_ordi = true;
                            }
                        }
                    }
                    compar = test;
                    flip(board.children[test].id);
                    jeu.display();
                }
                chgmt_m3 = false;
            }
        }
    }
}

function shuffle(li_tiles) {
    "use strict";
    var j, x, i;
    var id_i;
    var id_j;
    for (i = li_tiles.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        id_i = li_tiles[i].id;
        id_j = li_tiles[j].id;
        x = li_tiles[i];
        li_tiles[i] = li_tiles[j];
        li_tiles[i].id = id_i;
        li_tiles[j] = x;
        li_tiles[j].id = id_j;
    }
    return li_tiles;
}

function randInt(max) {
    "use strict";
    var res = Math.random() * max + 1;
    return Math.floor(res);
}

function Board(tiles = []) {
    this.tiles = tiles;
}

Board.prototype.display = function () {
    "use strict";
    if (!chgmt_m2 && !chgmt_m3) {
        var i;
        var jeu = document.getElementById("board");
        jeu.innerHTML = "";
        var pres;
        pres = document.getElementById("pres");
        var info_mode = document.getElementById("info_mode");
        info_mode.innerHTML = "";
        if (mode1) {
            pres.innerHTML = "Mode de jeu sélectionné : Contre la montre (appuyer à nouveau pour recommencer la partie).";
        }
        var infos;
        if (mode2) {
            pres.innerHTML = "Mode de jeu sélectionné : Joueur VS. Joueur (appuyer à nouveau pour recommencer la partie).";
            infos = document.createElement("p");
            if (joueur1) {
                infos.innerHTML = "C'est au tour du Joueur 1 ! SCORE: J1= " + score_j1 + " et J2= " + score_j2;
            } else {
                infos.innerHTML = "C'est au tour du Joueur 2 ! SCORE: J1= " + score_j1 + " et J2= " + score_j2;
            }
            info_mode.appendChild(infos);
        }
        if (mode3) {
            pres.innerHTML = "Mode de jeu sélectionné : Contre l'ordinateur (appuyer à nouveau pour recommencer la partie).";
            infos = document.createElement("p");
            if (joueur) {
                infos.innerHTML = "C'est à votre tour ! SCORE: VOUS= " + score_j + " et ORDI= " + score_ordi;
            } else {
                infos.innerHTML = "C'est au tour de l'ordinateur ! SCORE: VOUS= " + score_j1 + " et ORDI= " + score_ordi;
            }
            info_mode.appendChild(infos);
        }
        var img;
        for (i = 1; i < this.tiles.length; i += 1) {
            img = document.createElement("img");
            img.id = this.tiles[i - 1].id;
            img.src = this.tiles[i - 1].img_recto;
            jeu.appendChild(img);
            if (i % 5 === 0) {
                jeu.appendChild(document.createElement("br"));
            }
            img.addEventListener("click", function () {
                if (!uneSeconde) {
                    if (mode1) {
                        mode_actuel = 1;
                        if (chrono_active) {
                          lancer_chrono();
                        }
                        if (!partie_reussie()) {
                            flip(this.id);
                        }
                    }
                    if (mode2) {
                        mode_actuel = 2;
                        flip(this.id);
                    }
                    if (mode3 && !ordi) {
                        mode_actuel = 3;
                        flip(this.id);
                    }
                }
            });
        } 
    } else {
        var info_mode = document.getElementById("info_mode");
        info_mode.innerHTML = "";
        var infos = document.createElement("p");
        if (!partie_finie) {
            if (mode2 && chgmt_m2) {
                if (joueur1) {
                    infos.innerHTML = "C'est au tour du Joueur 1 ! SCORE: J1= " + score_j1 + " et J2= " + score_j2;
                } else {
                    infos.innerHTML = "C'est au tour du Joueur 2 ! SCORE: J1= " + score_j1 + " et J2= " + score_j2;
                }
            } 
            if (mode3 && chgmt_m3) {
                if (joueur) {
                    infos.innerHTML = "C'est à votre tour ! SCORE: VOUS= " + score_j + " et ORDI= " + score_ordi;
                } else {
                    infos.innerHTML = "C'est au tour de l'ordinateur ! SCORE: VOUS= " + score_j + " et ORDI= " + score_ordi;
                }
            }
            info_mode.appendChild(infos);
        } else {
            if (chgmt_m2) {
                if (score_j1 > score_j2) {
                    infos.innerHTML = "Partie terminée ! RESULTAT: Victoire du joueur 1 avec " + score_j1 + " paires dévoilées (contre " + score_j2 + " pour le joueur 2) !";
                }
                if (score_j2 > score_j1) {
                   infos.innerHTML = "Partie terminée ! RESULTAT: Victoire du joueur 2 avec " + score_j2 + " paires dévoilées (contre " + score_j1 + " pour le joueur 1) !";
                }
                if (score_j1 === score_j2) {
                   infos.innerHTML = "Partie terminée ! RESULTAT: Egalité ! Les deux joueurs ont tous deux dévoilé 6 paires.";
                }
            }
            if (chgmt_m3) {
                if (score_j > score_ordi) {
                    infos.innerHTML = "Partie terminée ! RESULTAT: Victoire ! avec " + score_j + " paires dévoilées (contre " + score_ordi + " pour l'ordinateur) !";
                }
                if (score_ordi > score_j) {
                    infos.innerHTML = "Partie terminée ! RESULTAT: Défaite ! L'ordinateur a dévoilé " + score_ordi + " paires (contre " + score_j + " pour vous) !";
                }
                if (score_j === score_ordi) {
                    infos.innerHTML = "Partie terminée ! RESULTAT: Egalité ! L'ordinateur et vous avez tous deux dévoilé 6 paires !";
                }
            }
            info_mode.appendChild(infos);
        }
    }
};

Board.prototype.reset = function () {
    "use strict";
    this.tiles = [];
    var i = 0;
    var id = 0;
    var id_img = 0;
    var tuile1;
    var tuile2;
    for (i = 0; i < 13; i += 1) {
        tuile1 = new Tile(id, "img" + id_img + ".png");
        tuile2 = new Tile(id + 1, "img" + id_img + ".png");
        this.tiles.push(tuile1);
        this.tiles.push(tuile2);
        id = id + 2;
        id_img = id_img + 1;
        this.tiles = shuffle(this.tiles);
    }
};

var jeu = new Board();
var mode1 = false;
var mode2 = false;
var mode3 = false;
var joueur1 = true;
var joueur2 = false;
var score_j1 = 0;
var score_j2 = 0;
var partie_finie = false;
var chrono_run = false;
var chrono_active;
var joueur = true;
var ordi = false;
var score_j = 0;
var score_ordi = 0;

function j_vs_j() {
    "use strict";
    mode1 = false;
    mode3 = false;
    mode2 = true;
    mode_actuel = "";
    clearInterval(chrono_run);
    partie_finie = false;
    joueur1 = true;
    joueur2 = false;
    score_j1 = 0;
    score_j2 = 0;
    nb_coups = 0;
    cpt = 0;
    var chrono = document.getElementById("chrono");
    chrono.innerHTML = "";
    main();
}

function mode_CLM() {
    "use strict";
    mode2 = false;
    mode3 = false;
    mode1 = true;
    chgmt_m2 = false;
    nb_pairs = 0;
    nb_coups = 0;
    cpt = 0;
    clearInterval(chrono_run);
    chrono_active = true;
    mode_actuel = "";
    var chrono = document.getElementById("chrono");
    var chrono_min = 2;
    var chrono_sec = 0;
    var chrono_csec = 0;
    chrono.innerHTML = chrono_min + ":0" + chrono_sec + ":0" + chrono_csec;
    main();
}

function lancer_chrono() {
    "use strict";
    partie_finie = false;
    chrono_active = false;
    var chrono = document.getElementById("chrono");
    var chrono_min = 2;
    var chrono_sec = 0;
    var chrono_csec = 0;
    var min_victoire = 0;
    var sec_victoire = 0;
    var csec_victoire = 0;
    chrono.innerHTML = chrono_min + ":0" + chrono_sec + ":0" + chrono_csec;
    chrono_run = setInterval(function () {
        csec_victoire += 1;
        if (csec_victoire > 99) {
            csec_victoire = 0;
            sec_victoire += 1;
        }
        if (sec_victoire > 59) {
            sec_victoire = 0;
            csec_victoire = 0;
            min_victoire += 1;
        }
        if (!(chrono_a_zero())) {
            chrono_csec -= 1;
            if (chrono_csec < 0) {
                if (chrono_min === 0 && chrono_sec === 0) {
                    chrono_csec = 0;
                } else {
                    chrono_csec = 99;
                    chrono_sec -= 1;
                }
            }
            if (chrono_sec < 0) {
                chrono_sec = 59;
                chrono_min -= 1;
            }
            if (chrono_min < 0) {
                chrono_min = 0;
                chrono_sec = 0;
                chrono_csec = 0;
            }
            if (chrono_sec < 10 && chrono_csec < 10) {
                chrono.innerHTML = chrono_min + ":0" + chrono_sec + ":0" + chrono_csec;
            }
            if (chrono_sec < 10 && chrono_csec >= 10) {
                chrono.innerHTML = chrono_min + ":0" + chrono_sec + ":" + chrono_csec;
            }
            if (chrono_sec >= 10 && chrono_csec < 10) {
                chrono.innerHTML = chrono_min + ":" + chrono_sec + ":0" + chrono_csec;
            }
            if (chrono_sec >= 10 && chrono_csec >= 10) {
                chrono.innerHTML = chrono_min + ":" + chrono_sec + ":" + chrono_csec;
            }
        }
        if (chrono_a_zero() || partie_reussie()) {
            partie_finie = true;
            clearInterval(chrono_run);
            if (partie_reussie()) {
                var temps_reussite;
                if (sec_victoire < 10 && csec_victoire < 10) {
                    temps_reussite = min_victoire + ":0" + sec_victoire + ":0" + csec_victoire;
                }
                if (sec_victoire < 10 && csec_victoire >= 10) {
                    temps_reussite = min_victoire + ":0" + sec_victoire + ":" + csec_victoire;
                }
                if (sec_victoire >= 10 && csec_victoire < 10) {
                    temps_reussite = min_victoire + ":" + sec_victoire + ":0" + csec_victoire;
                }
                if (sec_victoire >= 10 && csec_victoire >= 10) {
                    temps_reussite = min_victoire + ":" + sec_victoire + ":" + csec_victoire;
                }
                alert("Félicitations, vous avez gagné en " + temps_reussite + " avec " + nb_coups + " tentatives !");
			}
			else alert("Temps écoulé, vous avez perdu !");
			}
	},10);
}

function chrono_a_zero() {
    "use strict";
    return document.getElementById("chrono").innerHTML === "0:00:00";
}

function partie_reussie() {
    "use strict";
    return nb_pairs === 12;
}

function j_vs_o() {
    "use strict";
    var message_bug = prompt("/!\\ Le mode 'Joueur VS Ordinateur' n'est pas complet (la page entière plante après qu'une paire soit découverte et vous serez obligé de la 'tuer'). Entrez 'oui' si vous voulez tout de même lancer ce mode.", "oui");
    if (message_bug === 'oui') {
        mode1 = false;
        mode2 = false;
        mode3 = true;
        mode_actuel = "";
        cpt = 0;
        score_j = 0;
        score_ordi = 0;
        nb_pairs = 0;
        partie_finie = false;
        joueur = true;
        ordi = false;
        clearInterval(chrono_run);
        var chrono = document.getElementById("chrono");
        chrono.innerHTML = "";
        main();
    }
}

function main (){
	"use strict";
	if (!mode1 && !mode2 &&!mode3) {
		var presentation = document.getElementById("presentation");
		presentation.innerHTML = ""; 
		var pres = document.createElement("p");
		pres.id = "pres";
		pres.innerHTML = "Veuillez sélectionner un mode de jeu ci-dessus."
		presentation.appendChild(pres);
	}
	if (mode1 || mode2 || mode3) {
		jeu.reset();
		jeu.display();
	}
}
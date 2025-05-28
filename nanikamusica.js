//ボタンと表示エリアの準備
const keyButton = document.getElementById("key");
const jenButton = document.getElementById("jen");
const lengButton = document.getElementById("leng");
const soundButton = document.getElementById("sound");
const keyDivision = document.getElementById("key-area");
const resultDivision = document.getElementById("result-area");
const lengDivision = document.getElementById("leng-area");

//ディグリーネームの一覧
let degrees = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"];
//キーの一覧
let keys = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
//コードの種類別一覧
let majChords = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
let minChords = ["Cm", "D♭m", "Dm", "E♭m", "Em", "Fm", "F#m", "Gm", "A♭m", "Am", "B♭m", "Bm"];
let dimChords = ["Cdim", "D♭dim", "Ddim", "E♭dim", "Edim", "Fdim", "F#dim", "Gdim", "A♭dim", "Adim", "B♭dim", "Bdim"];

//キーを設定
let key = 0;
const keyHeading = document.createElement("h3");
keyHeading.innerText = "キー:" + keys[0];
keyDivision.appendChild(keyHeading);
keyButton.addEventListener(
    "click",
    () => {
        key = (key + 1) % 12;
        keyDivision.innerText = "";
        resultDivision.innerText = "";
        keyHeading.innerText = "キー:" + keys[key];
        keyDivision.appendChild(keyHeading);
    }
);

//長さを設定
let leng = 7;
const lengHeading = document.createElement("h3");
lengHeading.innerText = "長さ:" + (leng + 1);
lengDivision.appendChild(lengHeading);
lengButton.addEventListener(
    "click",
    () => {
        if (leng === 7) {
            leng = 3
        } else {
            leng = 7
        }
        resultDivision.innerText = "";
        lengHeading.innerText = "長さ:" + (leng + 1);
        lengDivision.appendChild(lengHeading);
    }
)

//コードを生成
const paragraph = document.createElement("p");
let ChordJen = {};
let jenDone = 0;
jenButton.addEventListener(
    "click",
    () => {
        //キー別にコードを取得し、TDSを設定
        let Chords = [majChords[0 + key], minChords[(2 + key) % 12], minChords[(4 + key) % 12], majChords[(5 + key) % 12], majChords[(7 + key) % 12], minChords[(9 + key) % 12], dimChords[(11 + key) % 12]];
        let TChords = [Chords[0], Chords[2], Chords[5]];
        let DChords = [Chords[4], Chords[6]];
        let SChords = [Chords[1], Chords[3]];

        //0番目のコード
        let jenRand0 = randNum(3);
        if (jenRand0 === 0) {
            ChordJen[0] = TChords[randNum(3)];
        } else if (jenRand0 === 1) {
            ChordJen[0] = DChords[randNum(2)];
        } else {
            ChordJen[0] = SChords[randNum(2)];
        }
        //1~leng-3番目のコード
        for (let i = 1; i <= leng - 3; i++) {
            if (leng === 4) {
                break;
            }
            let jenRand1 = randNum(3);
            if (TChords.includes(ChordJen[i - 1]) && jenRand1 <= 1) {
                ChordJen[i] = SChords[randNum(2)];
            } else if (DChords.includes(ChordJen[i - 1]) || (SChords.includes(ChordJen[i - 1]) && jenRand1 === 0)) {
                ChordJen[i] = TChords[randNum(3)];
            } else {
                ChordJen[i] = DChords[randNum(2)];
            }
        }
        //leng-2番目のコード
        if (TChords.includes(ChordJen[leng - 3])) {
            ChordJen[leng - 2] = SChords[randNum(2)];
        } else {
            ChordJen[leng - 2] = TChords[randNum(3)];
        }
        //leng-1番目のコード
        if (TChords.includes(ChordJen[leng - 2]) && randNum(2) === 0) {
            ChordJen[leng - 1] = SChords[randNum(2)];
        } else {
            ChordJen[leng - 1] = DChords[randNum(2)];
        }
        //leng番目のコード
        ChordJen[leng] = TChords[randNum(3)];

        //0~選択肢数で整数の乱数を作る
        function randNum(choices) {
            let tmp = Math.floor(Math.random() * choices);
            return tmp;
        }

        //全部のコードを繋げて出力
        let TDS = {};
        let degree = {};
        let Chord = {};
        for (let i = 0; i <= leng; i++) {
            if (TChords.includes(ChordJen[i])) {
                TDS[i] = "T";
            } else if (DChords.includes(ChordJen[i])) {
                TDS[i] = "D";
            } else {
                TDS[i] = "S";
            }
            degree[i] = degrees[Chords.indexOf(ChordJen[i])];
            Chord[i] = ChordJen[i] + "(" + TDS[i] + "/" + degree[i] + ")";
        }
        let result;
        if (leng === 7) {
            result = Chord[0] + "→" + Chord[1] + "→" + Chord[2] + "→" + Chord[3] + "→" + Chord[4] + "→" + Chord[5] + "→" + Chord[6] + "→" + Chord[7];
        } else {
            result = Chord[0] + "→" + Chord[1] + "→" + Chord[2] + "→" + Chord[3];
        }
        resultDivision.innerText = "";
        paragraph.innerText = result;
        resultDivision.appendChild(paragraph);
        jenDone = jenDone + 1;
    }
);

//音声の読み込み
const sounds = {
    0: new Audio("sound/C.mp3"),
    1: new Audio("sound/Df.mp3"),
    2: new Audio("sound/D.mp3"),
    3: new Audio("sound/Ef.mp3"),
    4: new Audio("sound/E.mp3"),
    5: new Audio("sound/F.mp3"),
    6: new Audio("sound/Fs.mp3"),
    7: new Audio("sound/G.mp3"),
    8: new Audio("sound/Af.mp3"),
    9: new Audio("sound/A.mp3"),
    10: new Audio("sound/Bf.mp3"),
    11: new Audio("sound/B.mp3"),
    12: new Audio("sound/highC.mp3"),
    13: new Audio("sound/highDf.mp3"),
    14: new Audio("sound/highD.mp3"),
    15: new Audio("sound/highEf.mp3"),
    16: new Audio("sound/highE.mp3"),
    17: new Audio("sound/highF.mp3"),
    18: new Audio("sound/highFs.mp3")
};

//音声の再生
soundButton.addEventListener(
    "click",
    () => {
        //生成ボタンが押されたかの確認
        if (!jenDone) {
            return;
        }
        //和音の組み立て
        let root = {};
        let third = {};
        let fifth = {};
        for (let i = 0; i <= leng; i++) {
            if (majChords.includes(ChordJen[i])) {
                root[i] = majChords.indexOf(ChordJen[i]);
                third[i] = root[i] + 4;
                fifth[i] = third[i] + 3;
            } else if (minChords.includes(ChordJen[i])) {
                root[i] = minChords.indexOf(ChordJen[i]);
                third[i] = root[i] + 3;
                fifth[i] = third[i] + 4;
            } else {
                root[i] = dimChords.indexOf(ChordJen[i]);
                third[i] = root[i] + 3;
                fifth[i] = third[i] + 3;
            }
        };
        let ChordSound = {};
        for (let i = 0; i <= leng; i++) {
            ChordSound[i] = [sounds[root[i]], sounds[third[i]], sounds[fifth[i]]];
        }
        //順に再生する
        for (let i = 0; i <= leng; i++) {
            setTimeout(
                () => {
                    ChordSound[i].forEach(sound => {
                        let cloneChordSound = sound.cloneNode();
                        cloneChordSound.currentTime = 0;
                        cloneChordSound.volume = 0.2;
                        cloneChordSound.play();
                    })
                }, i * 1500);

        }
    }
)
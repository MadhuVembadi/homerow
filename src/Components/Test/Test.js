import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import './Test.css'
import { VscDebugRestart } from 'react-icons/vsc'
import { GiArrowCursor, GiFinishLine } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import Result from '../Result/Result';
import { useSelector, useDispatch } from 'react-redux';
import { currResult } from '../../Slices/resultSlice';

function Test() {

    let [words, setWords] = useState([]);
    let [text, setText] = useState('');
    let [timer, setTimer] = useState(30);
    let [isRunning, setRunning] = useState(false);
    let [isFinished, setFinished] = useState(false);
    let [typed, setTyped] = useState(0);
    let [grossWPM, setGrossWPM] = useState(0);
    let [netWPM, setNetWPM] = useState(0);
    let [acc, setAcc] = useState(0);

    const Ref = useRef(null);
    const tyRef = useRef(null);
    const gwpmRef = useRef(null);
    const netRef = useRef(null);


    let result = useSelector(state => state.result);


    var grossArr = [];
    var netArr = [];


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getWords = async () => {
        let res = await axios.get("https://raw.githubusercontent.com/salmannotkhan/typing-test/main/src/wordlists/words.json");
        setWords(res.data);
    }

    const joinwords = () => {

        //sorting words in random order
        words.sort(() => Math.random() - 0.5);

        let s = "";
        words.forEach(item => {
            s = s + item + " ";
        })
        setText(s);


        //removing all classnames if refresh is hit

        let arr = document.querySelectorAll(".extra");

        Array.from(arr).forEach(item => {
            item.remove();
        })


        arr = document.querySelectorAll("#word.correct");
        Array.from(arr).forEach(item => {
            item.className = 'd-inline';
            item.className = item.className.replace(" ", "");
        })

        arr = document.querySelectorAll("#letter.correct");
        Array.from(arr).forEach(item => {
            item.className = '';
            item.className = item.className.replace(" ", "");
        })

        arr = document.querySelectorAll(".wrong");
        Array.from(arr).forEach(item => {
            item.className = '';
            item.className = item.className.replace(" ", "");
        })

        arr = document.querySelectorAll(".current");
        Array.from(arr).forEach(item => {
            item.className = item.className.replace("current", "");
            item.className = item.className.replace(/\s/g, "")
        })

        arr = document.querySelectorAll(".d-inline");
        Array.from(arr).forEach(item => {
            item.className = item.className.replace("current", "");
            item.className = item.className.replace(/\s/g, "")
        })

        document.querySelector("#cursor").style.top = '224px';
        document.querySelector("#cursor").style.left = '41px';
        document.querySelector("#words").style.margin = '10px 20px';

        //clearing previous timers if refresh is hit
        if (Ref.current) {
            clearInterval(Ref.current);
        }

        //intitialising timers and all others if refresh is hit
        setTimer(30);
        setRunning(false);
        setGrossWPM(0);
        setTyped(0);
        setNetWPM(0);

        grossArr = [];
        netArr = [];

        if (text.length != 0) {

            addClassName(document.getElementById("word"), " current");
            addClassName(document.getElementById("letter"), "current");

        }
    }

    const addClassName = (element, name) => {
        if (element) {
            element.className += name;
        }
    }

    const rmclassName = (element) => {
        element.className = element.className.replace("current", "");
    }


    //Timer Implementation
    const getRemainingTime = (e) => {
        let current = (new Date()).getTime();
        let msPassed = (current - e);
        let sPassed = Math.round(msPassed / 1000);

        return 30 - sPassed;
    }
    const startTimer = (e) => {
        let t = getRemainingTime(e);

        let time = ((30 - t) / 60);
        let wordsTyped = tyRef.current + 1;
        let gwpm = Math.round((wordsTyped / 5) / time);
        let crctChar = document.querySelectorAll("#word.correct #letter").length;

        //console.log(crctChar);
        let net = Math.round((crctChar / 5) / time);
        let l = document.querySelectorAll("#letter.correct").length;
        let acc = Math.floor((l / wordsTyped) * 100);

        grossArr.push({ sec: 30 - t - 1, gwpm: gwpm });
        netArr.push({ sec: 30 - t - 1, net: net });

        setGrossWPM(gwpm);
        setNetWPM(net);
        setAcc(acc);

        gwpmRef.current = gwpm;
        netRef.current = net;

        if (t >= 0) {
            setTimer(t);
        }
        else {
            if (Ref.current) {
                clearInterval(Ref.current);
            }
            finish();
        }
    }

    const clearTimer = (e) => {
        setTimer(30);

        if (Ref.current) {
            clearInterval(Ref.current);
        }

        const id = setInterval(() => {
            startTimer(e);
        }, 1000);

        Ref.current = id;

    }

    const getDeadTime = () => {
        return (new Date()).getTime();
    }

    //useEffects
    useEffect(() => {
        getWords();
    }, [])

    useEffect(() => {
        let l = document.querySelectorAll(".current").length;
        do {
            joinwords();
            l = document.querySelectorAll(".current");
        } while (l === 0);
    }, [words])


    const start = (event) => {

        let l = document.querySelectorAll(".current").length;
        console.log(l);
        if (l === 0) {
            addClassName(document.getElementById("word"), " current");
            addClassName(document.getElementById("letter"), "current");
        }

        let pressedKey = event.key;
        let currentTarget = document.querySelector("#words .current .current")
        let currentWord = currentTarget.parentElement;
        let actualKey = currentTarget.innerHTML;
        let isAlNum = pressedKey.length === 1 && pressedKey !== ' ';
        let isBackspace = pressedKey === 'Backspace';
        let isFirstLetter = currentWord.firstChild === currentTarget;
        let isFirstWord = currentWord === document.getElementById("word");
        let isExtra = currentTarget.className.includes("extra");

        setTyped(prevTyped => prevTyped + 1);
        tyRef.current = typed;


        if (!isRunning && isAlNum) {
            setRunning(true);
            clearTimer(getDeadTime());
            //startGross();
        }

        //if digit or character

        if (isAlNum) {
            if (pressedKey) {
                if (actualKey === ' ') {
                    const incorrectLetter = document.createElement("span");
                    incorrectLetter.innerHTML = pressedKey;
                    incorrectLetter.id = 'letter';
                    incorrectLetter.className = 'wrong extra';
                    currentTarget.parentElement.insertBefore(incorrectLetter, currentTarget);
                    currentTarget = incorrectLetter;
                }
                else {
                    addClassName(currentTarget, pressedKey === actualKey ? "correct" : "wrong");
                    rmclassName(currentTarget);
                    addClassName(currentTarget.nextSibling, "current");
                }

            }
            else {

            }
        }


        //for space

        if (pressedKey === ' ') {
            if (actualKey === ' ') {
                addClassName(currentTarget, " correct");

                let total = currentWord.querySelectorAll("#letter").length
                let actualcorrect = currentWord.querySelectorAll("#letter.correct").length

                if (total === actualcorrect) {
                    addClassName(currentWord, " correct");
                }

            }
            let arr = [...currentWord.querySelectorAll("#letter:not(.correct,.wrong")]

            arr.forEach(item => {
                addClassName(item, " missed");
            })

            rmclassName(currentTarget);
            rmclassName(currentTarget.parentElement);
            addClassName(currentTarget.parentElement.nextSibling, " current");
            addClassName(currentTarget.parentElement.nextSibling.firstChild, "current")
        }

        //for backspace

        if (isBackspace) {

            if (currentTarget && isFirstLetter && isFirstWord) {

            }
            else if (currentTarget && isFirstLetter) {

                rmclassName(currentTarget);
                rmclassName(currentWord);
                addClassName(currentWord.previousSibling, " current");
                addClassName(currentWord.previousSibling.lastChild, " current");
                currentWord.previousSibling.lastChild.className = currentWord.previousSibling.lastChild.className.replace("wrong", "");
                currentWord.previousSibling.lastChild.className = currentWord.previousSibling.lastChild.className.replace("correct", "");
            }

            else if (currentTarget && !isFirstLetter) {

                rmclassName(currentTarget);
                if (currentTarget.previousSibling.className.includes("extra")) {
                    currentTarget.previousSibling.remove();
                    addClassName(currentTarget, "current");
                }
                else {
                    addClassName(currentTarget.previousSibling, " current");
                    currentTarget.previousSibling.className = currentTarget.previousSibling.className.replace("wrong", "");
                    currentTarget.previousSibling.className = currentTarget.previousSibling.className.replace("correct", "");
                }
            }
        }

        //movesLines
        if (currentTarget == currentWord.lastChild || pressedKey === ' ') {

            if (currentWord.nextSibling.getBoundingClientRect().top > 265.0625) {
                let words = document.querySelector("#words");
                let margin = parseInt(words.style.marginTop || '0px');
                words.style.marginTop = (margin - 47) + 'px';
            }
        }

        //moving cursor
        let nextLetter = document.querySelector("#letter.current");
        let cursor = document.querySelector("#cursor");
        if (nextLetter) {
            cursor.style.top = nextLetter.getBoundingClientRect().top + 4 + 'px';
            cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
        }
    }


    //finish the game

    const finish = () => {

        setGrossWPM(gwpmRef.current);
        setNetWPM(netRef.current);

        let arr = [];
        netArr.forEach((item, idx) => {
            arr.push({ sec: idx, net: netArr[idx].net, raw: grossArr[idx].gwpm })
        });

        let crctChar = document.querySelectorAll("#letter.correct").length;
        let totalChar = tyRef.current + 1;

        let acc = Math.round((crctChar / totalChar) * 100);
        setAcc(acc);

        let correct = document.querySelectorAll("#letter.correct").length;
        let incorrect = document.querySelectorAll("#letter.wrong").length;
        let extra = document.querySelectorAll(".extra").length;
        let missed = document.querySelectorAll(".missed").length;

        let actionObj = currResult({ wpm: netRef.current, accuracy: acc, graphData: arr, correct: correct, incorrect: incorrect, extra: extra, missed: missed });
        dispatch(actionObj);

        setFinished(true);
        navigate('/result');
    }


    return (
        <div className='test'>

            <div className='m-5 mx-auto area mb-2'>
                <div id="info" className='w-100 d-flex justify-content-start'>
                    <div id="timer" className='mb-2 text-start ms-5 me-5'>
                        {timer}
                    </div>
                    <div id="gwpm" className='ms-5 me-5 mb-2'>
                        {netWPM}
                    </div>
                </div>


                <div id="text" className='w-100' tabIndex="0" onKeyDown={(e) => start(e)} >
                    <div id="words" >
                        {
                            text.length != 0 ?
                                words.map((item, index) => <div key={index} className='d-inline' id="word">
                                    {
                                        item.split('').map((l, idx) => <span key={index + idx} id="letter">{l}</span>)
                                    }
                                    <span id="letter"> </span>
                                </div>)
                                :
                                () => joinwords()
                        }
                    </div>
                    <div id="cursor">

                    </div>
                    <div id="focus-error">
                        <GiArrowCursor size="20" className='m-2' />Click here to focus
                    </div>
                </div>
                <div className='m-5 mb-2'>
                    <button onClick={() => joinwords()} >
                        <VscDebugRestart size="30" color="white" />
                    </button>
                </div>
            </div>
        </div >

    )
}

export default Test

//#8884d8
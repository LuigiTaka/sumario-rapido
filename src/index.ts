import { SorensenDiceSimilarity, DefaultTextParser, ConsoleLogger, RelativeSummarizerConfig, Summarizer, NullLogger, Sentence } from "ts-textrank";

//Only one similarity function implemented at this moment.
//More could come in future versions.

const sim = new SorensenDiceSimilarity()

//Only one text parser available a this moment
const parser = new DefaultTextParser()

//Do you want logging?
const logger = new ConsoleLogger()

//You can implement LoggerInterface for different behavior,
//or if you don't want logging, use this:
//const logger = new NullLogger()

//Set the summary length as a percentage of full text length
const ratio = .25 

//Damping factor. See "How it works" for more info.
const d = .85

//How do you want summary sentences to be sorted?
//Get sentences in the order that they appear in text:
//const sorting = Summarizer.SORT_OCCURENCE
const sorting = Summarizer.SORT_SCORE
//Or sort them by relevance:
//const sorting = SORT_BY.SCORE
const config = new RelativeSummarizerConfig(ratio, sim, parser, d, sorting)

//Or, if you want a fixed number of sentences:
//const number = 5
//const config = new AbsoluteSummarizerConfig(number, sim, parser, d, sorting)    

const summarizer = new Summarizer(config, logger)

//Language is used for stopword removal.
//See https://github.com/fergiemcdowall/stopword for supported languages
//const lang = "porBr"
let lang = "en"


const LANG_OPT = [
    { lang: 'en', label: 'inglês' },
    { lang: 'es', label: 'espanhol' },
    { lang: 'ptbr', label: 'Português Brasil' },

];





const $select = (<HTMLInputElement>document.getElementById('options'));
const $textarea = (<HTMLInputElement>document.getElementById("textarea"))
const $trigger = document.getElementById('trigger')
const $list = document.getElementById('list')



LANG_OPT.forEach( (opt) => {
    const $options = document.createElement('option')
    $options.setAttribute('value',opt.lang)
    $options.innerText = opt.label


    $select.appendChild( $options )
})

$trigger.addEventListener('click',(e) => {



    const text = $textarea.value
    const lang = $select.value;

    const summary = summarizer.summarize(text, lang)


    if( summary.length === 0 ){
        summary.push( "Nada encontrado." );
    }

    $list.innerHTML = '';
    summary.forEach(  ( phrase ) =>{ 

        const $li = document.createElement( "li" )
        $li.innerText = phrase;
        $list.appendChild( $li )

    });

})



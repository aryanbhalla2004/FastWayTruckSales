import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import options from "../../Util/options.js"
import imageCompression from 'browser-image-compression';
import Axios from "axios";
import moment from 'moment';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import numWords from 'num-words';

export const ChequeAdd = (props) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    amount: "",
    date: "",
    amountWord: "",
    for: "",
    memo: ""
  });


  const updateUserInput = (e) => {
    setUserInput(prevInput => ({
      ...prevInput, [e.target.name]: e.target.value
    }));
    setError("");

    if(e.target.name === "amount") {
      convertAmountToWords(parseFloat(e.target.value));
    }
  }

  
  const onSubmit = async (e) => {
    e.preventDefault();
    var item = userInput;
    
    if(userInput.amount != "" && userInput.amountWord != "" && userInput.date != "" && userInput.for != "" && userInput.memo != "") {
      try{
        let chequeInfo = await props.add("cheque", item);
        history('/dashboard/cheque');
      }
      catch(e){
        setError(e.message);
      }
    } else {
      setError("Please complete the form and try again.")
    }
  }

  function convertAmountToWords(num) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand', 'million', 'billion'];

    // Helper function to convert a number under 1000 to words
    function convertHundreds(num) {
        let result = '';

        if (num >= 100) {
            result += ones[Math.floor(num / 100)] + ' hundred ';
            num %= 100;
        }

        if (num >= 11 && num <= 19) {
            result += teens[num - 10] + ' ';
        } else {
            if (num >= 10) {
                result += tens[Math.floor(num / 10)] + ' ';
                num %= 10;
            }

            if (num > 0) {
                result += ones[num] + ' ';
            }
        }

        return result.trim();
    }

    // Function to convert the entire number to words
    function convertNumberToWords(num) {
        if (num === 0) return 'zero';

        let word = '';
        let thousandCounter = 0;

        while (num > 0) {
            const chunk = num % 1000;
            if (chunk > 0) {
                word = convertHundreds(chunk) + ' ' + thousands[thousandCounter] + ' ' + word;
            }
            num = Math.floor(num / 1000);
            thousandCounter++;
        }

        return word.trim();
    }

    // Main logic for the amount conversion
    if (num < 0) return 'Invalid amount';

    // Split the integer and decimal (cents) parts
    const [integerPart, decimalPart] = num.toFixed(2).split('.');

    // Convert integer part and cents part to words
    const integerInWords = convertNumberToWords(Number(integerPart));
    const centsInWords = decimalPart === '00' ? '' : convertNumberToWords(Number(decimalPart));

    // Construct the final result
    let result = centsInWords
        ? `${integerInWords} dollars and ${centsInWords} cents only`
        : `${integerInWords} dollars only`;

    setUserInput(prevInput => ({
      ...prevInput, amountWord: result.charAt(0).toUpperCase() + result.slice(1)
    }));
  }


  return (
    <div className='header-content-right-page'>
      <div className='content-sizing-db wrapper-db-content'>
        <div className='header-and-create-button'>
          <h3>Add New Cheque</h3>
          <Link to="/dashboard/cheque" className="btn-general primary-btn"><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
        <form onSubmit={onSubmit} className="card card-light card-body border-0 shadow-sm p-4 mt-5" id="basic-info">
          <div className="row form-row">
            <h2 className="h4 mb-4">Cheque Details</h2>
            <button type="submit" className="btn-general primary-btn blue mb-4" > Submit</button>
          </div>
          {error  && <div class="alert alert-danger" role="alert">{error}</div>}
          
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="date">Date<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="date" name="date" type="date" onChange={updateUserInput}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="memo">Memo<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="memo" name="memo" type="text" onChange={updateUserInput} value={userInput.memo}/>
            </div>
            
          </div>

          
          <div className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="for">For<span>*</span></label> 
              <input className="form-control form-control-md form-control-dark" id="for" name="for" type="text" onChange={updateUserInput} value={userInput.for}/>
            </div>
            <div className="col">
              <label className="form-label text-dark" htmlFor="amount">Amount<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="amount" name="amount" type="number" value={userInput.amount} onChange={updateUserInput} />
            </div>
          </div>
          <div  className="row mt-3">
            <div className="col">
              <label className="form-label text-dark" htmlFor="amountWord">Amount In Words<span>*</span></label>
              <input className="form-control form-control-md form-control-dark" id="amountWord" name="amountWord" type="text" value={userInput.amountWord} disabled/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


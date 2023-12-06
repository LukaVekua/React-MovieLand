import { Form } from "react-router-dom"
import checked from '../assets/check-mark.png'
import checkedRed from '../assets/check-red.png'
export const FirstStepUI = ({ currentStep }) => {
    return <div id="first-step-box">
        <section id="headers-box">
            <span className="steps-controller"><span>{currentStep}</span> of <span>3</span> Steps</span>
            <span className="header-span">Welcome back!</span>
            <span className="header-span">Joining Movieland is easy.</span>
            <h3 className="reference">Fill register fields and you'll be watching in no time.</h3>
        </section>
        <Form className="form" method="post" >
            <div>
                <span>Email</span>
                <input required type="email" />
            </div>
            <div>
                <span>Password</span>
                <input required type="password" />
            </div>
        </Form>
    </div>
}

export const SecondStepUI = ({ currentStep }) => {
    return <div id="second-step-box">
        <section id="headers-box">
            <img src={checked} alt="check-mark" />
            <span className="steps-controller"><span>{currentStep}</span> of <span>3</span> Steps</span>
            <h2>Choose your plan.</h2>
        </section>
        <section id="body-box">
            <span><img src={checkedRed} alt="checked" />No commitments, cancel anytime.</span>
            <span><img src={checkedRed} alt="checked" />Everything on Movieland for one low price.</span>
            <span><img src={checkedRed} alt="checked" />Unlimited viewing on all your devices.</span>
        </section>
    </div>
}


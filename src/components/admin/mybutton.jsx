import PropTypes from "prop-types";

export const ApprovedButton = (props) => {
    return (
        <div>
            {
                props.approval === true ?
                    <button className="btn btn-md btn-success text-white dark:text-black" onClick={props.onApproved}>Approved</button> :
                    <button className="btn btn-md text-white bg-red-500" onClick={props.onApproved}>Unapproved</button>
            }
        </div>
    )
}

ApprovedButton.propTypes = {
    approval: PropTypes.bool.isRequired,
    onApproved: PropTypes.func.isRequired
};


export const CompletedButton = (props) => {
    return (
        <div>
            {
                props.completed === true ?
                    <div className="tooltip tooltip-left w-full" data-tip="unmark completed">
                        <button className="btn btn-md btn-success text-white w-full dark:text-black"
                                onClick={props.onCompleted}>Completed
                        </button>
                    </div> :
                    <div className="tooltip tooltip-left w-full" data-tip="mark completed">
                        <button className="btn btn-md text-white bg-warning dark:text-black"
                                onClick={props.onCompleted}>Incomplete
                        </button>
                    </div>
            }
        </div>
    )
}

CompletedButton.propTypes = {
    completed: PropTypes.bool.isRequired,
    onCompleted: PropTypes.func.isRequired,
};

export const SmallCompletedButton = (props) => {
    return (
        <div>
            {
                props.completed === true ?
                    <div className="tooltip tooltip-left w-full" data-tip="unmark completed">
                        <button className="btn btn-sm btn-success text-white w-full dark:text-black"
                                onClick={props.onCompleted}>Completed
                        </button>
                    </div> :
                    <div className="tooltip tooltip-left w-full" data-tip="mark completed">
                    <button className="btn btn-sm text-white bg-warning dark:text-black"
                                onClick={props.onCompleted}>Incomplete
                        </button>
                    </div>
            }
        </div>
    )
}

SmallCompletedButton.propTypes = {
    completed: PropTypes.bool.isRequired,
    onCompleted: PropTypes.func.isRequired,
};


export const SpamButton = (props) => {
    return (
        <div>
            {
                props.spam === true ?
                    <div className="tooltip" data-tip="change to spam">
                        <button className="btn btn-md btn-success text-white" onClick={props.onHam}>Ham</button>
                    </div> : <div className="tooltip" data-tip="change to ham">
                        <button className="btn btn-md text-white bg-warning" onClick={props.onHam}>Spam</button>
                    </div>
            }
        </div>
    )
}

SpamButton.propTypes = {
    spam: PropTypes.bool.isRequired,
    onHam: PropTypes.func.isRequired,
};

export const SmallSpamButton = (props) => {
    return (
        <div>
            {
                props.spam === true ?
                    <div className="tooltip" data-tip="change to spam">
                        <button className="btn btn-sm btn-success text-white dark:text-black" onClick={props.onHam}>Ham</button>
                    </div> : <div className="tooltip" data-tip="change to ham">
                        <button className="btn btn-sm text-white bg-warning dark:text-black" onClick={props.onHam}>Spam</button>
                    </div>
            }
        </div>
    )
}

SmallSpamButton.propTypes = {
    spam: PropTypes.bool.isRequired,
    onHam: PropTypes.func.isRequired,
};
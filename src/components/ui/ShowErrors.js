import PropTypes from 'prop-types'

const ShowErrors = ({ errors=[], onClearError=f=>f, onClearAllErrors=f=>f }) =>
    <div className="show-errors" onDoubleClick={() => onClearAllErrors()}>
        {
            (errors.length) 
        ? 
            errors.map((message, i) =>
                <div key={i} className="error">
                    <p title="double click to clear all errors">{message}</p>
                    <span onClick={() => onClearError(i)}> x </span>
                </div>
            ) 
        : 
            null
        }
    </div>


ShowErrors.propTypes = {
    errors: PropTypes.array,
    onClearError: PropTypes.func,
    onClearAllErrors: PropTypes.func
}

export default ShowErrors
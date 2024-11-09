import PropTypes from 'prop-types';

const TemperatureToggle = ({ isCelsius, onChange }) => {
  return (
    <button
      onClick={onChange}
      className="flex items-center justify-center px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
    >
      <span className="text-sm font-medium text-blue-800">
        {isCelsius ? '°C' : '°F'}
      </span>
    </button>
  );
};

TemperatureToggle.propTypes = {
  isCelsius: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TemperatureToggle;
import { Check, X } from "lucide-react";
const PasswordRules = ({ password }) => {
  const rules = [
    { label: "At Least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {rules.map((items) => (
        <div key={items.label} className="flex items-center text-xs">
          {items.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-green-500 mr-2" />
          )}
          <span className={items.met ? "text-green-500" : "text-gray-200"}>
            {items.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({password}) => {
  const strongPassword = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const strength = strongPassword(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrongPasswordTxt = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-200">Password Strength:</span>
        <span className="text-xs text-gray-200">
          {getStrongPasswordTxt(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4).fill(null)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <PasswordRules password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;

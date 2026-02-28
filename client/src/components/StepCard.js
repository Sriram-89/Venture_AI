"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepCard = StepCard;
var utils_1 = require("@/lib/utils");
function StepCard(_a) {
    var number = _a.number, title = _a.title, description = _a.description, Icon = _a.icon, color = _a.color, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
    var colorStyles = {
        orange: "bg-orange-50 border-orange-100 text-orange-900 icon-bg-orange-100 icon-text-orange-600",
        white: "bg-white border-slate-100 text-slate-900 icon-bg-slate-100 icon-text-slate-600",
        green: "bg-green-50 border-green-100 text-green-900 icon-bg-green-100 icon-text-green-600",
    };
    var selectedStyle = colorStyles[color];
    return (<div className={(0, utils_1.cn)("relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1", selectedStyle, "animate-fade-in")} style={{ animationDelay: "".concat(delay, "ms") }}>
      <div className="absolute -top-4 -right-4 text-6xl font-black opacity-5 select-none font-display">
        {number}
      </div>
      <div className={(0, utils_1.cn)("w-12 h-12 rounded-xl flex items-center justify-center mb-4", color === 'orange' ? 'bg-orange-100 text-orange-600' : color === 'green' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-900')}>
        <Icon className="w-6 h-6"/>
      </div>
      <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
      <p className="text-sm opacity-80 leading-relaxed">{description}</p>
    </div>);
}

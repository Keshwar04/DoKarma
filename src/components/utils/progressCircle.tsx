const ProgressCircle = ({ percentage }: any) => {
    const fillDegree = percentage * 3.6;
    return (
        <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Outer Circle with Progress */}
            <div
                className="absolute w-full h-full rounded-full transform"
                style={{
                    background: `conic-gradient(#3064A2 ${fillDegree}deg, #e5e7eb ${fillDegree}deg)`,
                }}
            />

            {/* Inner Circle */}
            <div className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-center text-xs font-semibold text-gray-800">
                    {percentage}%
                </span>
            </div>
        </div>
    )
}

export default ProgressCircle

export const categories = [
    { value: 'Emergency' },
    { value: 'Environment' },
    { value: 'Financial' },
    { value: 'Animals' }
]

const activity = [
    { value: 'Feeding the Poor' },
    { value: 'Medical' },
    { value: 'Educational' },
    { value: 'Animal Welfare' },
    { value: 'Yoga' },
    { value: 'Environmental Protection' },
    { value: 'Preservation of Monuments' },
    { value: 'Old age homes' },
    { value: 'Orphanages' },
    { value: 'Asylums' },
    { value: 'Waste Management' },
    { value: 'Women welfare organization' },
    { value: 'Widows MSME organization' },
]

export const majorActivities = activity.map(e => ({ label: e.value, value: e.value }))

export const currencies = [
    { value: 'Indian Rupee INR', code: 'INR' },
    { value: 'United States', code: 'USD' },
    { value: 'Singapore', code: 'SGD' },
    { value: 'Hong Kong', code: 'HKD' }
]

export const countries = [
    { value: 'India', code: 'IND' },
    { value: 'Afganistan', code: 'AF' },
    { value: 'Argentina', code: 'AR' },
    { value: 'Bulgaria', code: 'BC' },
]

export const cities = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Trichy', value: 'Trichy' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Theni', value: 'Theni' }
]
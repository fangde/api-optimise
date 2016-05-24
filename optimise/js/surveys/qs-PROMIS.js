/**
 * Created by Leon on 13/08/2015.
 */
var qidx = -1;
var testName="Global";
var PROMIS_static_questions = [// grouped questions
    {
        answers: [{key: 'Excellent', value: 1, conv: 5}, {key: 'Very Good', value: 2,conv: 4}, {key: 'Good', value: 3,conv: 3}, {
            key: 'Fair',
            value: 4,conv: 2
        }, {key: 'Poor', value: 5,conv: 1}],
        title: '',
        questions: [{
            'idx': testName + (++qidx),
            QSTEST: 'Global01',
            'question': '1. In general, would you say your health is'
        },
            {
                'idx': testName + (++qidx),
                QSTEST: 'Global02',
                'question': '2. In general, would you say your quality of life is'
            },
            {
                'idx': testName + (++qidx),
                QSTEST: 'Global03',
                'question': '3. In general, how would you rate your physical health?'
            },
            {
                'idx': testName + (++qidx),
                QSTEST: 'Global04',
                'question': '4. In general, how would you rate your mental health, including your mood and your ability to think?'
            },
            {
                'idx': testName + (++qidx),
                QSTEST: 'Global05',
                'question': '5. In general, how would you rate your satisfaction with your social activities and relationships?'
            },
            {
                'idx': testName + (++qidx),
                QSTEST: 'Global09',
                'question': '6. In general, please rate how well you carry out your usual social activities and roles. (This includes activities at home, at work and in your community, and responsibilities as a parent, child, spouse, employee, friend, etc.)'
            }]},
    {
        answers: [{key: 'Completely', value: 1,conv: 5}, {key: 'Mostly', value: 2,conv: 4}, {key: 'Moderately', value: 3,conv: 3}, {
            key: 'A little',
            value: 4,conv: 2
        }, {key: 'Not at all', value: 5,conv: 1}],
        title: '<b>Everyday physical activity</b>',
        questions: [{
            'idx': testName + (++qidx),
            QSTEST: 'Global06',
            'question': '7. To what extent are you able to carry out your everyday physical activities such as walking, climbing stairs, carrying groceries, or moving a chair?.... '
        }]
    },
    {
        answers: [{key: 'Never', value: 1,conv: 5}, {key: 'Rarely', value: 2,conv: 4}, {key: 'Sometimes', value: 3,conv: 3}, {
            key: 'Often',
            value: 4,conv: 2
        }, {key: 'Always', value: 5,conv: 1}],
        title: '<b>In the past 7 days…</b>',
        questions: [{
            'idx': testName + (++qidx),
            QSTEST: 'Global10',
            'question': '8. How often have you been bothered by emotional problems such as feeling anxious, depressed or irritable?.... '
        }]
    },
    {
        answers: [{key: 'None', value: 1, conv: 5}, {key: 'Mild', value: 2,conv: 4}, {key: 'Moderate', value: 3,conv: 3}, {
            key: 'Severe',
            value: 4,conv: 2
        }, {key: 'Very severe', value: 5,conv: 1}],
        title: '<b>Average fatigue in last 7 days,</b>',
        questions: [{
            'idx': testName + (++qidx),
            QSTEST: 'Global08',
            'question': '9. How would you rate your fatigue on average? '
        }]
    },
    {
        answers: [{key: '0 - No pain', value: 0,conv: 5}, {key: '1', value: 1,conv: 4}, {key: '2', value: 2,conv: 4}, {
            key: '3',
            value: 3,conv: 4
        }, {key: '4', value: 4,conv: 3}, {key: '5', value: 5,conv: 3}, {key: '6', value: 6,conv: 3}, {key: '7', value: 7,conv: 2}, {
            key: '8',
            value: 8,conv: 2
        }, {key: '9', value: 9,conv: 2},{key: '10 - Worst Iimaginable pain', value: 10,conv: 1}],
        title: '<b>Average pain in last 7 days</b>',
        exFlag: true,
        questions: [{
            'idx': testName + (++qidx),
            QSTEST: 'Global07',
            'question': '10. How would you rate your pain on average? '
        }]
    }
];
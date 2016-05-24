/**
 * Created by Leon on 13/08/2015.
 */
var qidx = -1;
var msqol54_static_questions = [// grouped questions
    {
        answers: [{key: 'Excellent', value: 1}, {key: 'Very Good', value: 2}, {key: 'Good', value: 3}, {
            key: 'Fair',
            value: 4
        }, {key: 'Poor', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '1. In general, would you say your health is'
        }]
    },
    {
        answers: [{key: 'Much better now than one year ago', value: 1}, {
            key: 'Somewhat better now than one year ago',
            value: 2
        }, {key: 'About the same', value: 3}, {
            key: 'Somewhat worse now than one year ago',
            value: 4
        }, {key: 'Much worse now than one year ago', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '2. <u>Compared to one year ago</u>, how would you rate your health in general <u>now</u>?'
        }]
    },
    {
        answers: [{key: 'Yes, Limited a Lot', value: 1}, {
            key: 'Yes, Limited a Little',
            value: 2
        }, {key: 'No, Not Limited at All', value: 3}],
        title: 'The following questions are about activities you might do during a typical day. Does <u>your health</u> limit you in these activities? If so, how much?',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '3. <u>Vigorous activities</u>, such as running, lifting heavy objects, participating in strenuous sports'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '4. <u>Moderate activities</u>, such as moving a table, pushing a vacuum cleaner, bowling, or playing golf'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '5. Lifting or carrying groceries'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '6. Climbing <u>several</u> flights of stairs'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '7. Climbing <u>one</u> flight of stairs'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '8. Bending, kneeling, or stooping'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '9. Walking <u>more than a mile</u>'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '10. Walking <u>several blocks</u>'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '11. Walking <u>one block</u>'},
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '12. Bathing and dressing yourself'}
        ]
    },
    {
        answers: [{key: 'Yes', value: 1}, {key: 'NO', value: 2}],
        title: 'During the <u>past 4 weeks</u>, have you had any of the following problems with your work or other regular daily activities <u>as a result of your physical health</u>?',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '13. Cut down on the <u>amount of time</u> you could spend on work or other activities'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '14. <u>Accomplished less</u> than you would like'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '15. Were limited in the <u>kind</u> of work or other activities'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '16. Had <u>difficulty</u> performing the work or other activities(for example, it took extra effort)'
            }
        ]
    },
    {
        answers: [{key: 'Yes', value: 1}, {key: 'NO', value: 2}],
        title: 'During the <u>past 4 weeks</u>, have you had any of the following problems with your work or other regular daily activities as a result of any emotional problems (such as feeling depressed or anxious).',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '17. Cut down on the <u>amount of time</u> you could spend on work or other activities'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '18. <u>Accomplished less</u> than you would like'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '19. Didn\'t do work or other activities as <u>carefully</u> as usual'
            }
        ]
    },
    {
        answers: [{key: 'Not at all', value: 1}, {key: 'Slightly', value: 2}, {
            key: 'Moderately',
            value: 3
        }, {key: 'Quite a bit', value: 4}, {key: 'Extremely', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '20. During the <u>past 4 weeks</u>, to what extent has your physical health or emotional problems interfered with your normal social activities with family, friends, neighbors, or groups?'
        }]
    },
    {
        answers: [{key: 'None', value: 1}, {key: 'Very mild', value: 2}, {key: 'Mild', value: 3}, {
            key: 'Moderate',
            value: 4
        }, {key: 'Severe', value: 5}, {key: 'Very severe', value: 6}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '21. How much <u>bodily</u> pain have you had during the <u>past 4 weeks</u>?'
        }]
    },
    {
        answers: [{key: 'Not at all', value: 1}, {key: 'A little bit ', value: 2}, {
            key: 'Moderately',
            value: 3
        }, {key: 'Quite a bit', value: 4}, {key: 'Extremely', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '22. During the <u>past 4 weeks</u>, how much did <u>pain</u> interfere with your normal work (including both work outside the home and housework)?'
        }]
    },
    {
        answers: [{key: 'All of the Time', value: 1}, {
            key: 'Most Of the Time',
            value: 2
        }, {key: 'A Good Bit of the Time', value: 3}, {key: 'Some of the Time', value: 4}, {
            key: 'A Little of the Time',
            value: 5
        }, {key: 'None of the Time', value: 6}],
        title: 'These questions are about how you feel and how things have been with you <u>during the past 4 weeks</u>. For each question, please give the one answer that comes closest to the way you have been feeling.<br>How much of the time during the <u>past 4 weeks</u>...',
        questions: [
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '23. Did you feel full of pep?'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '24. Have you been a very nervous person?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '25. Have you felt so down in the dumps that nothing could cheer you up?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '26. Have you felt calm and peaceful?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '27. Did you have a lot of energy?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '28. Have you felt downhearted and blue?'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '29. Did you feel worn out?'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '30. Have you been a happy person?'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '31. Did you feel tired?'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '32. Did you feel rested on waking in the morning?'
            }
        ]
    },
    {
        answers: [{key: 'All of the time', value: 1}, {key: 'Most of the time', value: 2}, {
            key: 'Some of the time',
            value: 3
        }, {key: 'A little of the time', value: 4}, {key: 'None of the time', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '33. During the <u>past 4 weeks</u>, how much of the time has your <u>physical health or emotional problems</u> interfered with your social activities (like visiting with friends, relatives, etc.)?'
        }]
    },
    {
        answers: [{key: 'Definitely True', value: 1}, {key: 'Mostly True', value: 2}, {
            key: 'Not Sure',
            value: 3
        }, {key: 'Mostly False', value: 4}, {key: 'Definitely False', value: 5}, {key: 'None of the Time', value: 6}],
        title: 'How TRUE or FALSE is each of the following statements for you.',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '34. I seem to get sick a little easier than other people'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '35. I am as healthy as anybody I know'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '36. I expect my health to get worse'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '37. My health is excellent'}
        ]
    },
    {
        answers: [{key: 'All of the Time', value: 1}, {
            key: 'Most of the Time',
            value: 2
        }, {key: 'A Good Bit of the Time', value: 3}, {key: 'Some of the Time', value: 4}, {
            key: 'A Little of the Time',
            value: 5
        }, {key: 'None of the Time', value: 6}],
        title: 'How much of the time during the <u>past 4 weeks</u>...',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '38. Were you discouraged by your health problems?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '39. Were you frustrated about your health?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '40. Was your health a worry in your life?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '41. Did you feel weighed down by your health problems?'
            }
        ]
    },
    {
        answers: [{key: 'All of the Time', value: 1}, {
            key: 'Most of the Time',
            value: 2
        }, {key: 'A Good Bit of the Time', value: 3}, {key: 'Some of the Time', value: 4}, {
            key: 'A Little of the Time',
            value: 5
        }, {key: 'None of the Time', value: 6}],
        title: 'How much of the time during the <u>past 4 weeks</u>...',
        questions: [
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '42. Have you had difficulty concentrating and thinking?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '43. Did you have trouble keeping your attention on an activity for long?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '44. Have you had trouble with your memory?'
            },
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '45. Have others, such as family members or friends, noticed that you have trouble with your memory or problems with your concentration?'
            }
        ]
    },
    {
        answers: [{key: 'Not a problem', value: 1}, {
            key: 'A Little of a Problem',
            value: 2
        }, {key: 'Somewhat of a Problem', value: 3}, {key: 'Very Much a Problem', value: 4}],
        title: 'The next set of questions are about your sexual function and your satisfaction with your sexual function. Please answer as accurately as possible about your function <u>during the last 4 weeks only</u>.<br>How much of a problem was each of the following for you <u>during the past 4 weeks</u>...',
        questions: [
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '46. Lack of sexual interest'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '47. [MEN] Difficulty getting or keeping an erection <br> [WOMEN] Inadequate lubrication'
            },
            {'idx': 'msqol_Q' + (++qidx), QSTEST: 'MSQOL54-Q' + (qidx), 'question': '48. Difficulty having orgasm'},
            {
                'idx': 'msqol_Q' + (++qidx),
                QSTEST: 'MSQOL54-Q' + (qidx),
                'question': '49. Ability to satisfy sexual partner'
            }
        ]
    },
    {
        answers: [{key: 'Very satisfied', value: 1}, {
            key: 'Somewhat satisfied',
            value: 2
        }, {key: 'Neither satisfied nor dissatisfied', value: 3}, {
            key: 'Somewhat dissatisfied',
            value: 4
        }, {key: 'Very dissatisfied ', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '50. Overall, how satisfied were you with your sexual function during the <u>past 4 weeks</u>?'
        }]
    },
    {
        answers: [{key: 'Not at all', value: 1}, {key: 'Slightly', value: 2}, {
            key: 'Moderately',
            value: 3
        }, {key: 'Quite a bit', value: 4}, {key: 'Extremely', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '51. During the <u>past 4 weeks</u>, to what extent have problems with your bowel or bladder function interfered with your normal social activities with family, friends, neighbors, or groups?'
        }]
    },
    {
        answers: [{key: 'Not at all', value: 1}, {key: 'Slightly', value: 2}, {
            key: 'Moderately',
            value: 3
        }, {key: 'Quite a bit', value: 4}, {key: 'Extremely', value: 5}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '52. During the <u>past 4 weeks</u>, how much did pain interfere with your enjoyment of life?'
        }]
    },
    {
        answers: [{key: 'Best(10)', value: 10}, {key: '(9)', value: 9}, {key: '(8)', value: 8}, {
            key: '(7)',
            value: 7
        }, {key: '(6)', value: 6}, {key: '(5)', value: 5}, {key: '(4)', value: 4}, {key: '(3)', value: 3}, {
            key: '(2)',
            value: 2
        }, {key: 'Worst(1)', value: 1}],
        title: '',
        exFlag: true,
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '53. Overall, how would you rate your own quality-of-life?'
        }]
    },
    {
        answers: [{key: 'Terrible', value: 1}, {key: 'Unhappy', value: 2}, {
            key: 'Mostly dissatisfied',
            value: 3
        }, {key: 'Mixed - about equally satisfied and dissatisfied', value: 4}, {
            key: 'Mostly satisfied',
            value: 5
        }, {key: 'Pleased', value: 6}, {key: 'Delighted', value: 7}],
        title: '',
        questions: [{
            'idx': 'msqol_Q' + (++qidx),
            QSTEST: 'MSQOL54-Q' + (qidx),
            'question': '54. Which best describes how you feel about your life as a whole?'
        }]
    }
];
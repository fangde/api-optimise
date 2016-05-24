
var qidx = -1;
var testName="Short Form";
var QoL_static_questions = [];
function createJson()
{
    QoL_static_questions = [
        {
            answers: [{key: 'None', value: 1, conv: 5}, {key: 'A little', value: 2,conv: 4}, {key: 'Somewhat', value: 3,conv: 3}, {
                key: 'A lot',
                value: 4,conv: 2
            }, {key: 'Cannot do', value: 5,conv: 1}],
            title: '<b>How much DIFFICULTY do you currently have...</b>',
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQCOG01',
                'question': '1. writing notes to yourself, such as appointments or \'to do\' lists?'
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG04',
                    'question': '2. understanding family and friends on the phone?'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG08',
                    'question': '3. carrying on a conversation with a small group of familiar people (e.g., family or a few friends)?'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG10',
                    'question': '4. organizing what you want to say?'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG11',
                    'question': '5. speaking clearly enough to use the telephone?'
                }]},
        {
            answers: [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQPRF01',
                'question': '6. I can keep up with my family responsibilities '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF03',
                    'question': '7. I am able to do all of my regular family activities '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF08',
                    'question': '8. I am able to socialize with my friends'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF09',
                    'question': '9. I am able to do all of my regular activities with friends '
                },{
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF17',
                    'question': '10. I can keep up with my social commitments '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF26',
                    'question': '11. I am able to participate in leisure activities '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF32',
                    'question': '12. I am able to perform my daily routines '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPRF34',
                    'question': '13. I can keep up with my work responsibilities (include work at home)'
                }]
        },
        {
            answers: [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQANX26',
                'question': '14. I felt uneasy '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX22',
                    'question': '15. I felt nervous '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX23',
                    'question': '16. Many situations made me worry '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX20',
                    'question': '17. My worries overwhelmed me '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX27',
                    'question': '18. I felt tense '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX28',
                    'question': '19. I had difficulty calming down '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX09',
                    'question': '20. I had sudden feelings of panic '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQANX07',
                    'question': '21. I felt nervous when my normal routine was disturbed '
                }]
        },
        {
            answers: [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQDEP13',
                'question': '22. I felt depressed '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP23',
                    'question': '23. I felt hopeless '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP07',
                    'question': '24. I felt that nothing could cheer me up '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP27',
                    'question': '25. I felt that my life was empty '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP02',
                    'question': '26. I felt worthless '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP19',
                    'question': '27. I felt unhappy '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP21',
                    'question': '28. I felt I had no reason for living'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQDEP24',
                    'question': '29. I felt that nothing was interesting '
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQPER02',
                'question': '30. I had trouble controlling my temper '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER05',
                    'question': '31. It was hard to control my behavior '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER06',
                    'question': '32. I had trouble controlling my temper '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER07',
                    'question': '33. I said or did things without thinking '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER11',
                    'question': '34. I got impatient with other people '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER12',
                    'question': '35. I was bothered by little things '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER17',
                    'question': '36.  I became easily upset '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPER19',
                    'question': '37. I was in conflict with others '
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQFTG13',
                'question': '38. I felt exhausted '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG11',
                    'question': '39. I felt that I had no energy '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG15',
                    'question': '40. I felt fatigued '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG06',
                    'question': '41. I was too tired to do my household chores. '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG07',
                    'question': '42. I was too tired to leave the house '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG10',
                    'question': '43. I was frustrated by being too tired to do the things I wanted to do '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG14',
                    'question': '44.  I felt tired '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQFTG02',
                    'question': '45. I had to limit my social activity because I was tired '
                }]
        },
        {
            answers:  [{key: 'Without any difficulty', value: 1,conv: 5}, {key: 'With a little difficulty', value: 2,conv: 4}, {key: 'With somedifficulty', value: 3,conv: 3}, {
                key: 'With much difficulty',
                value: 4,conv: 2
            }, {key: 'Unable to do', value: 5,conv: 1}],
            title: '',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQMOB37',
                'question': '46. Are you able to get on and off the toilet? '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB30',
                    'question': '47. Are you able to step up and down curbs? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB26',
                    'question': '48. Are you able to get in and out of a car? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB32',
                    'question': '49. Are you able to get out of bed into a chair? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB25',
                    'question': '50. Are you able to push open a heavy door? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB33',
                    'question': '51. Are you able to run errands and shop? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB31',
                    'question': '52.  Are you able to get up off the floor from lying on your back without help? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQMOB28',
                    'question': '53. Are you able to go for a walk of at least 15 minutes?'
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>Lately...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQPPF14',
                'question': '54. I had a sense of well-being '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF12',
                    'question': '55. I felt hopeful '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF15',
                    'question': '56. My life was satisfying '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF20',
                    'question': '57. My life had purpose '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF17',
                    'question': '58. My life had meaning '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPP22',
                    'question': '59. I felt cheerful '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF19',
                    'question': '60. My life was worth living '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF16',
                    'question': '61. I had a sense of balance in my life '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQPPF07',
                    'question': '62. Many areas of my life were interesting to me '
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQSLP02',
                'question': '63. I had to force myself to get up in the morning '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP03',
                    'question': '64. I had trouble stopping my thoughts at bedtime '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP04',
                    'question': '65. I was sleepy during the daytime '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP05',
                    'question': '66. I had trouble sleeping because of bad dreams '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP07',
                    'question': '67. I had trouble falling asleep '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP12',
                    'question': '68. Pain woke me up '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP13',
                    'question': '69. I avoided or cancelled activities with my friends because I was tired from having a bad night \'s sleep '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSLP18',
                    'question': '70. I felt physically tense during the middle of the night or early morning hours '
                }]
        },
        {
            answers:  [{key: 'Without any difficulty', value: 1,conv: 5}, {key: 'With a little difficulty', value: 2,conv: 4}, {key: 'With somedifficulty', value: 3,conv: 3}, {
                key: 'With much difficulty',
                value: 4,conv: 2
            }, {key: 'Unable to do', value: 5,conv: 1}],
            title: '',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQUEX29',
                'question': '71. Are you able to turn a key in a lock? '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX20',
                    'question': '72. Are you able to brush your teeth? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX44',
                    'question': '73. Are you able to make a phone call using a touch tone key-pad? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX36',
                    'question': '74. Are you able to pick up coins from a table top? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX30',
                    'question': '75. Are you able to write with a pen or pencil?'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX28',
                    'question': '76. Are you able to open and close a zipper? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX33',
                    'question': '77.  Are you able to wash and dry your body? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQUEX37',
                    'question': '78. Are you able to shampoo your hair?'
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 1}, {key: 'Rarely', value: 2,conv: 2}, {key: 'Sometimes', value: 3,conv: 3}, {
                key: 'Often',
                value: 4,conv: 4
            }, {key: 'Always', value: 5,conv: 5}],
            title: 'Lately...',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQSTG02',
                'question': '79. Because of my illness, some people avoided me '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG04',
                    'question': '80. Because of my illness, I felt left out of things '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG 08',
                    'question': '81. Because of my illness, people avoided looking at me '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG 16',
                    'question': '82. I felt embarrassed about my illness '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG 01',
                    'question': '83. Because of my illness, some people seemed uncomfortable with me '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG 17',
                    'question': '84. I felt embarrassed because of my physical limitations '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG05',
                    'question': '85. Because of my illness, people were unkind to me '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSTG21',
                    'question': '86. Some people acted as though it was my fault I have this illness '
                }]
        },
        {
            answers:  [{key: 'Not at all', value: 1,conv: 5}, {key: 'A little bit', value: 2,conv: 4}, {key: 'Somewhat', value: 3,conv: 3}, {
                key: 'Quite a bit',
                value: 4,conv: 2
            }, {key: 'Very much', value: 5,conv: 1}],
            title: '<b>In the past 7 days..</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQSAT 03',
                'question': '87. I am bothered by my limitations in regular family activities '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT 23',
                    'question': '88. I am disappointed in my ability to socialize with my family '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT14',
                    'question': '89. I am bothered by limitations in my regular activities with friends '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT11',
                    'question': '90. I am disappointed in my ability to meet the needs of my friends '
                }]
        },
        {
            answers:  [{key: 'Not at all', value: 1,conv: 1}, {key: 'A little bit', value: 2,conv: 2}, {key: 'Somewhat', value: 3,conv: 3}, {
                key: 'Quite a bit',
                value: 4,conv: 4
            }, {key: 'Very much', value: 5,conv: 5}],
            title: '<b>In the past 7 days...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQSAT33',
                'question': '91. I am satisfied with my ability to do things for fun outside my home '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT32',
                    'question': '92. I am satisfied with the amount of time I spend doing leisure activities '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT47',
                    'question': '93. I am satisfied with how much of my work I can do (include work at home)'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQSAT 46',
                    'question': '94. I am satisfied with my ability to do household chores or tasks '
                }]
        },
        {
            answers:  [{key: 'Never', value: 1,conv: 5}, {key: 'Rarely(Once)', value: 2,conv: 4}, {key: 'SomeTimes(2-3 Times)', value: 3,conv: 3}, {
                key: 'Often (once a day)',
                value: 4,conv: 2
            }, {key: 'Very often (several times a day)', value: 5,conv: 1}],
            title: 'Average pain in last 7 days',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQCOG64',
                'question': '95. I had to read something several times to understand it '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG75',
                    'question': '96. My thinking was slow '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG77',
                    'question': '97. I had to work really hard to pay attention or I would make a mistake'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG80',
                    'question': '98. I had trouble concentrating '
                }]
        },
        {
            answers:  [{key: 'None', value: 1,conv: 5}, {key: 'A little', value: 2,conv: 4}, {key: 'Somewhat', value: 3,conv: 3}, {
                key: 'A lot',
                value: 4,conv: 2
            }, {key: 'Cannot do', value: 5,conv: 1}],
            title: '<b>How much DIFFICULTY do you currently have...</b>',
            exFlag: false,
            questions: [{
                'idx': testName + (++qidx),
                QSTEST: 'NQCOG22',
                'question': '99. reading and following complex instructions (e.g., directions for a new medication)? '
            },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG24',
                    'question': '100. planning for and keeping appointments that are not part of your weekly routine, (e.g., a therapy or doctor appointment, or a social gathering with friends and family)? '
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG25',
                    'question': '101. managing your time to do most of your daily activities?'
                },
                {
                    'idx': testName + (++qidx),
                    QSTEST: 'NQCOG40',
                    'question': '102. learning new tasks or instructions? '
                }]
        }
    ];
}
createJson();
//console.log("result : " ,PROMIS_static_questions);
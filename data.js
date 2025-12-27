// 游戏数据配置
const GameData = {
    // 时间阶段配置
    timeStages: [
        { id: 'morning', name: '清晨', color: '#87CEEB', icon: 'fas fa-sun' },
        { id: 'noon', name: '中午', color: '#FFD700', icon: 'fas fa-sun' },
        { id: 'afternoon', name: '下午', color: '#FFA500', icon: 'fas fa-cloud-sun' },
        { id: 'night', name: '晚上', color: '#4B0082', icon: 'fas fa-moon' }
    ],

    // 各时间段可用选项
    timeOptions: {
        morning: [
            { id: 'morning_court', name: '上早朝', icon: 'fas fa-landmark', desc: '处理国家大事，听取百官奏报' },
            { id: 'study', name: '习文', icon: 'fas fa-book', desc: '御书房学习，提升学识修养' },
            { id: 'martial', name: '习武', icon: 'fas fa-fist-raised', desc: '校场训练，强身健体' }
        ],
        noon: [
            { id: 'rest', name: '午休', icon: 'fas fa-bed', desc: '小憩片刻，恢复精力' },
            { id: 'study', name: '习文', icon: 'fas fa-book', desc: '御书房学习，提升学识修养' },
            { id: 'martial', name: '习武', icon: 'fas fa-fist-raised', desc: '校场训练，强身健体' },
            { id: 'harem', name: '逛后宫', icon: 'fas fa-female', desc: '后宫游赏，与妃嫔相处' }
        ],
        afternoon: [
            { id: 'study', name: '习文', icon: 'fas fa-book', desc: '御书房学习，提升学识修养' },
            { id: 'martial', name: '习武', icon: 'fas fa-fist-raised', desc: '校场训练，强身健体' },
            { id: 'harem', name: '逛后宫', icon: 'fas fa-female', desc: '后宫游赏，与妃嫔相处' },
            { id: 'meet_minister', name: '面见大臣', icon: 'fas fa-users', desc: '单独召见大臣商议国事' }
        ],
        night: [
            { id: 'night_study', name: '夜读', icon: 'fas fa-book', desc: '挑灯夜读，刻苦钻研' },
            { id: 'favor', name: '宠幸妃嫔', icon: 'fas fa-heart', desc: '临幸后宫，雨露均沾' },
            { id: 'sleep', name: '就寝', icon: 'fas fa-bed', desc: '养精蓄锐，明日再战' }
        ]
    },

    // 妃嫔姓氏
    concubineSurnames: [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
        '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
        '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏'
    ],

    // 妃嫔名字
    concubineGivenNames: [
        '婉儿', '玉儿', '芳华', '梦瑶', '雨薇', '雪莲', '芙蓉', '牡丹',
        '秋月', '春梅', '夏荷', '冬雪', '诗韵', '画意', '琴音', '棋心',
        '嫣然', '悦然', '嫣然', '语嫣', '静姝', '慧敏', '淑仪', '婉容',
        '紫薇', '红玉', '青霞', '碧云', '素心', '雅兰', '若曦', '雨桐'
    ],

    // 妃嫔特长
    talents: ['歌舞', '诗词', '书画', '音律', '茶艺', '刺绣', '棋艺', '骑射'],

    // 学习选项配置
    studyOptions: {
        classics: {
            name: '经典典籍',
            icon: 'fas fa-scroll',
            desc: '四书五经，圣贤之道',
            skill: 'human',
            points: 5
        },
        art: {
            name: '文化艺术',
            icon: 'fas fa-palette',
            desc: '诗词歌赋，琴棋书画',
            skill: 'human',
            points: 5
        },
        strategy: {
            name: '帝王之术',
            icon: 'fas fa-chess-king',
            desc: '治国安邦，驭臣之道',
            skill: 'practice',
            points: 5
        },
        science: {
            name: '科学实用',
            icon: 'fas fa-flask',
            desc: '天文地理，农工技术',
            skill: 'practice',
            points: 5
        }
    },

    // 习武选项配置
    martialOptions: {
        riding: {
            name: '骑射武艺',
            icon: 'fas fa-horse-head',
            desc: '骑马射箭，战场杀敌',
            skill: 'physical',
            points: 5
        },
        strength: {
            name: '体格训练',
            icon: 'fas fa-dumbbell',
            desc: '强健体魄，力能扛鼎',
            skill: 'physical',
            points: 5
        },
        tactics: {
            name: '兵法大全',
            icon: 'fas fa-chess-board',
            desc: '排兵布阵，运筹帷幄',
            skill: 'practice',
            points: 5
        }
    },

    // 结局评价配置
    endings: {
        // 勤政比率对应的皇帝评价
        emperor: [{
                min: 0.75,
                max: 1.0,
                title: '千古明君',
                description: '陛下勤政爱民，文治武功皆卓越。您不仅学识渊博，更能学以致用，将理论与实践完美结合。在位期间，您励精图治，广纳贤才，改革弊政，发展经济，使得国力强盛，百姓安居乐业。您的英明统治让王朝走向巅峰，后世史书必将大书特书您的丰功伟绩。'
            },
            {
                min: 0.45,
                max: 0.749,
                title: '守成之君',
                description: '陛下在位期间，虽然未能有惊天动地之伟业，但也能维持祖宗基业，使王朝平稳发展。您处理政务中规中矩，虽无大过，却也缺乏开拓进取之精神。后世评价您为守成之主，能在复杂局势中保持稳定，已属不易。'
            },
            {
                min: 0,
                max: 0.449,
                title: '昏庸之君',
                description: '陛下在位期间，荒废政务，沉溺享乐，疏于治国。您忽视民生疾苦，重用奸佞小人，导致朝纲混乱，民怨沸腾。最终国力衰弱，边境不稳，内忧外患接踵而至。您的统治为王朝埋下了灭亡的祸根。'
            }
        ],

        // 朝代结局
        dynasty: [{
                min: 0.75,
                max: 1.0,
                title: '盛世王朝',
                description: '国家富强，百姓安居，文化繁荣，四方来朝。您的王朝成为历史上最辉煌的时代之一。'
            },
            {
                min: 0.45,
                max: 0.749,
                title: '平稳时期',
                description: '国家基本稳定，虽有小的波折但整体可控。您的王朝在历史长河中留下了中规中矩的一笔。'
            },
            {
                min: 0,
                max: 0.449,
                title: '国运衰微',
                description: '国家动荡，民不聊生，内忧外患。您的统治加速了王朝的衰败进程。'
            }
        ]
    },

    // 历史事件记录模板
    historyTemplates: {
        morning_court: [
            '今日早朝，陛下处理了边境战事，展现了卓越的军事才能。',
            '朝堂之上，陛下听取百官奏报，明智决策，深得民心。',
            '陛下在早朝时颁布新政，改革税制，减轻百姓负担。',
            '朝会中，陛下识破奸臣诡计，维护了朝堂正气。'
        ],
        study: [
            '陛下今日研读《资治通鉴》，对历代兴衰有了更深理解。',
            '御书房中，陛下批阅奏章到深夜，勤政爱民。',
            '陛下学习天文地理，对农业节气有了新的认识。',
            '今日陛下与大学士探讨治国之道，受益匪浅。'
        ],
        martial: [
            '校场之上，陛下箭无虚发，展现非凡武艺。',
            '今日陛下练习骑术，马术精进不少。',
            '陛下研读兵法，对古代战役有了新的见解。',
            '训练场上，陛下与将士同甘共苦，士气大振。'
        ],
        rest: [
            '陛下今日午休片刻，精神焕发。',
            '午后小憩，陛下梦中得仙人指点。'
        ],
        harem: [
            '陛下今日游赏御花园，与妃嫔赏花赋诗。',
            '后宫之中，陛下听妃嫔弹奏古琴，心情愉悦。',
            '陛下与妃嫔对弈，棋艺精湛让人赞叹。'
        ],
        favor: [
            '陛下今夜临幸{concubine}，恩爱有加。',
            '{concubine}侍寝，陛下对其宠爱更甚。'
        ],
        sleep: [
            '陛下今夜早早安歇，养精蓄锐。',
            '陛下就寝前批阅完最后一份奏章。'
        ],
        meet_minister: [
            '陛下召见丞相，商议国家大计。',
            '与兵部尚书商讨边防要务。',
            '召见户部尚书，了解财政状况。',
            '与礼部尚书讨论科举选拔事宜。'
        ],
        night_study: [
            '深夜挑灯，陛下研读经史。',
            '月下苦读，陛下学识又有精进。',
            '秉烛夜谈，与文臣讨论治国方略。'
        ]
    },

    // 妃嫔封号级别
    titleLevels: [
        { title: '皇后', level: 1 },
        { title: '皇贵妃', level: 2 },
        { title: '贵妃', level: 3 },
        { title: '妃', level: 4 },
        { title: '嫔', level: 5 },
        { title: '贵人', level: 6 },
        { title: '常在', level: 7 },
        { title: '答应', level: 8 }
    ],

    // 游戏提示信息
    tips: [
        '勤于政务和学习的皇帝更容易成为明君。',
        '适当的休息和娱乐有助于保持精力。',
        '平衡文武发展，方能治国平天下。',
        '后宫佳丽虽好，但勿沉迷其中。',
        '每个阶段的选择都会影响最终结局。',
        '技能达到一定程度会有额外加成。',
        '不同的妃嫔特长会影响皇帝的心情。',
        '早朝处理政务是皇帝的基本职责。'
    ],

    // 技能最大点数
    maxSkillPoints: {
        human: 150,
        practice: 150,
        physical: 150
    },

    // 游戏常量
    constants: {
        TOTAL_STAGES: 20,
        SKILL_INCREMENT: 5,
        MORNING_COURT_BONUS: 2,
        STUDY_LIMIT: 2,
        DEFAULT_CONCUBINE_AGE: 18,
        MIN_CONCUBINE_AGE: 16,
        MAX_CONCUBINE_AGE: 30,
        FAVOR_BONUS: 3,
        PROMOTION_FAVOR_THRESHOLD: 80
    }
};

// 游戏状态
let GameState = {
    // 玩家信息
    player: {
        emperorName: '',
        eraName: '',
        dynastyName: ''
    },

    // 游戏进度
    currentStage: 1,
    currentTimeIndex: 0,
    activeTime: 'morning',

    // 技能点数
    skills: {
        human: 0,
        practice: 0,
        physical: 0
    },

    // 统计信息
    stats: {
        studyCount: 0,
        martialCount: 0,
        courtCount: 0,
        haremCount: 0,
        favorCount: 0,
        restCount: 0,
        meetMinisterCount: 0,
        totalActions: 0
    },

    // 后宫数据
    harem: [],
    selectedConcubine: null,

    // 历史记录
    history: [],

    // 游戏是否结束
    gameEnded: false,

    // 临时存储
    temp: {
        selectedStudies: [],
        selectedMartial: null
    }
};

// 游戏工具类
const GameUtils = {
    // 重置游戏状态
    resetGame() {
        GameState.player = {
            emperorName: '',
            eraName: '',
            dynastyName: ''
        };

        GameState.currentStage = 1;
        GameState.currentTimeIndex = 0;
        GameState.activeTime = 'morning';

        GameState.skills = {
            human: 0,
            practice: 0,
            physical: 0
        };

        GameState.stats = {
            studyCount: 0,
            martialCount: 0,
            courtCount: 0,
            haremCount: 0,
            favorCount: 0,
            restCount: 0,
            meetMinisterCount: 0,
            totalActions: 0
        };

        GameState.harem = [];
        GameState.selectedConcubine = null;
        GameState.history = [];
        GameState.gameEnded = false;
        GameState.temp = {
            selectedStudies: [],
            selectedMartial: null
        };
    },

    // 保存游戏
    saveGame() {
        try {
            const saveData = {
                player: GameState.player,
                currentStage: GameState.currentStage,
                currentTimeIndex: GameState.currentTimeIndex,
                activeTime: GameState.activeTime,
                skills: GameState.skills,
                stats: GameState.stats,
                harem: GameState.harem,
                history: GameState.history,
                gameEnded: GameState.gameEnded
            };
            localStorage.setItem('emperorGameSave', JSON.stringify(saveData));
            return true;
        } catch (error) {
            console.error('保存游戏失败:', error);
            return false;
        }
    },

    // 加载游戏
    loadGame() {
        try {
            const saveData = localStorage.getItem('emperorGameSave');
            if (!saveData) return false;

            const data = JSON.parse(saveData);

            // 恢复游戏状态
            GameState.player = data.player || { emperorName: '', eraName: '', dynastyName: '' };
            GameState.currentStage = data.currentStage || 1;
            GameState.currentTimeIndex = data.currentTimeIndex || 0;
            GameState.activeTime = data.activeTime || 'morning';
            GameState.skills = data.skills || { human: 0, practice: 0, physical: 0 };
            GameState.stats = data.stats || {
                studyCount: 0,
                martialCount: 0,
                courtCount: 0,
                haremCount: 0,
                favorCount: 0,
                restCount: 0,
                meetMinisterCount: 0,
                totalActions: 0
            };
            GameState.harem = data.harem || [];
            GameState.history = data.history || [];
            GameState.gameEnded = data.gameEnded || false;
            GameState.temp = {
                selectedStudies: [],
                selectedMartial: null
            };

            return true;
        } catch (error) {
            console.error('加载游戏失败:', error);
            return false;
        }
    },

    // 更新状态显示
    updateStatusDisplay() {
        const currentEmperor = document.getElementById('current-emperor');
        const currentEra = document.getElementById('current-era');
        const currentStage = document.getElementById('current-stage');
        const currentTime = document.getElementById('current-time');

        console.log('更新状态显示:', {
            emperorName: GameState.player.emperorName,
            eraName: GameState.player.eraName,
            currentStage: GameState.currentStage
        });

        if (currentEmperor) {
            currentEmperor.textContent = GameState.player.emperorName || '--';
            console.log('设置皇帝名称:', currentEmperor.textContent);
        }

        if (currentEra) {
            currentEra.textContent = GameState.player.eraName || '--';
            console.log('设置年号:', currentEra.textContent);
        }

        if (currentStage) {
            currentStage.textContent = `第${GameState.currentStage}/${GameData.constants.TOTAL_STAGES}阶段`;
            console.log('设置阶段:', currentStage.textContent);
        }

        if (currentTime) {
            const timeStage = GameData.timeStages[GameState.currentTimeIndex];
            currentTime.textContent = `${timeStage.name} (阶段${GameState.currentStage})`;
        }
    },

    // 更新技能显示
    updateSkillDisplay() {
        const humanSkill = document.getElementById('human-skill');
        const practiceSkill = document.getElementById('practice-skill');
        const physicalSkill = document.getElementById('physical-skill');

        const humanProgress = document.getElementById('human-progress');
        const practiceProgress = document.getElementById('practice-progress');
        const physicalProgress = document.getElementById('physical-progress');

        if (humanSkill) humanSkill.textContent = GameState.skills.human;
        if (practiceSkill) practiceSkill.textContent = GameState.skills.practice;
        if (physicalSkill) physicalSkill.textContent = GameState.skills.physical;

        if (humanProgress) {
            const percentage = (GameState.skills.human / 150) * 100;
            humanProgress.style.width = `${percentage}%`;
        }

        if (practiceProgress) {
            const percentage = (GameState.skills.practice / 150) * 100;
            practiceProgress.style.width = `${percentage}%`;
        }

        if (physicalProgress) {
            const percentage = (GameState.skills.physical / 150) * 100;
            physicalProgress.style.width = `${percentage}%`;
        }
    },

    // 添加历史记录
    addHistory(eventType, customContent = '') {
        const templates = GameData.historyTemplates[eventType];
        let content = customContent;

        if (!content && templates) {
            content = templates[Math.floor(Math.random() * templates.length)];
        }

        if (!content) {
            content = `陛下进行了${eventType}活动。`;
        }

        const timeStage = GameData.timeStages[GameState.currentTimeIndex];
        const historyItem = {
            stage: GameState.currentStage,
            time: timeStage.name,
            content: content,
            eventType: eventType,
            timestamp: new Date().toLocaleString('zh-CN')
        };

        GameState.history.unshift(historyItem);

        // 限制历史记录数量
        if (GameState.history.length > 50) {
            GameState.history = GameState.history.slice(0, 50);
        }
    },

    // 渲染历史记录
    renderHistory() {
        const historyLog = document.getElementById('history-log');
        if (!historyLog) return;

        historyLog.innerHTML = '';

        GameState.history.slice(0, 10).forEach(item => {
            const historyDiv = document.createElement('div');
            historyDiv.className = 'history-item';
            historyDiv.innerHTML = `
                <strong>第${item.stage}阶段 ${item.time}:</strong> ${item.content}
            `;
            historyLog.appendChild(historyDiv);
        });
    },

    // 生成随机妃嫔
    generateRandomConcubine() {
        const surname = GameData.concubineSurnames[Math.floor(Math.random() * GameData.concubineSurnames.length)];
        const givenName = GameData.concubineGivenNames[Math.floor(Math.random() * GameData.concubineGivenNames.length)];
        const name = surname + givenName;

        // 随机选择封号（较低级别的）
        const titles = ['贵人', '常在', '答应'];
        const title = titles[Math.floor(Math.random() * titles.length)];

        // 随机年龄
        const age = Math.floor(Math.random() * (GameData.constants.MAX_CONCUBINE_AGE - GameData.constants.MIN_CONCUBINE_AGE + 1)) + GameData.constants.MIN_CONCUBINE_AGE;

        // 随机选择1-2个特长
        const talentCount = Math.floor(Math.random() * 2) + 1;
        const talents = [];
        const availableTalents = [...GameData.talents];

        for (let i = 0; i < talentCount && availableTalents.length > 0; i++) {
            const index = Math.floor(Math.random() * availableTalents.length);
            talents.push(availableTalents.splice(index, 1)[0]);
        }

        return {
            id: Date.now() + Math.random(),
            name: name,
            title: title,
            age: age,
            talents: talents,
            favor: 50,
            selected: false
        };
    },

    // 计算结局评价
    getEndingEvaluation() {
        // 计算勤政比率
        const totalPossibleActions = GameData.constants.TOTAL_STAGES * 4;
        const ratio = GameState.stats.totalActions / totalPossibleActions;

        // 计算总技能点数
        const totalSkills = GameState.skills.human + GameState.skills.practice + GameState.skills.physical;

        let emperorEvaluation, dynastyEvaluation;

        // 根据技能点数和勤政比率确定评价
        if (totalSkills >= 337 && ratio >= 0.75) {
            emperorEvaluation = GameData.endings.emperor[0];
            dynastyEvaluation = GameData.endings.dynasty[0];
        } else if (totalSkills >= 225 && ratio >= 0.45) {
            emperorEvaluation = GameData.endings.emperor[1];
            dynastyEvaluation = GameData.endings.dynasty[1];
        } else {
            emperorEvaluation = GameData.endings.emperor[2];
            dynastyEvaluation = GameData.endings.dynasty[2];
        }

        return {
            emperor: emperorEvaluation,
            dynasty: dynastyEvaluation,
            ratio: ratio,
            totalSkills: totalSkills
        };
    },

    // 显示通知
    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10001;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // 根据类型设置背景色
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                break;
            case 'warning':
                notification.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #17a2b8, #138496)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};
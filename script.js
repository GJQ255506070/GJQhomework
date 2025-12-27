// script.js - 修复妃嫔选择问题

class EmperorGame {
    constructor() {
        this.currentHaremMode = 'view'; // 'view' 或 'select'
        this.selectedConcubineIndex = -1;
        this.initializeGame();
        this.bindEvents();

        // 尝试加载存档
        if (this.loadGame()) {
            this.showGameScreen();
            this.validateTimeState();
            this.updateTimeDisplay();
            this.updateStatusDisplay();
            this.updateSkillDisplay();
            this.renderHistory();
            this.renderTimeOptions();
            this.renderConcubineList();
        }
    }

    // 初始化游戏
    initializeGame() {
        this.resetGame();
    }

    // 重置游戏状态
    resetGame() {
        GameUtils.resetGame();
        this.currentHaremMode = 'view';
        this.selectedConcubineIndex = -1;
    }

    // 保存游戏
    saveGame() {
        return GameUtils.saveGame();
    }

    // 加载游戏
    loadGame() {
        return GameUtils.loadGame();
    }

    // 绑定事件监听器
    bindEvents() {
        // 登录按钮
        document.getElementById('start-game').addEventListener('click', () => this.startGame());

        // 特殊操作按钮
        document.getElementById('view-concubines').addEventListener('click', () => {
            this.currentHaremMode = 'view';
            this.showHaremModal();
        });
        document.getElementById('add-concubine').addEventListener('click', () => this.showAddConcubineModal());
        document.getElementById('save-game').addEventListener('click', () => {
            this.saveGame();
            this.showNotification('游戏进度已保存', 'success');
        });

        // 模态框关闭按钮
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hideModal(modal);
                }
            });
        });

        // 点击模态框外部关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });

        // 早朝处理
        document.getElementById('handle-court').addEventListener('click', () => this.handleMorningCourt());

        // 学习确认
        document.getElementById('confirm-study').addEventListener('click', () => this.confirmStudy());

        // 习武确认
        document.getElementById('confirm-martial').addEventListener('click', () => this.confirmMartial());

        // 后宫临幸按钮
        const visitBtn = document.getElementById('visit-harem');
        if (visitBtn) {
            visitBtn.addEventListener('click', () => this.visitConcubine());
        }

        // 添加妃嫔确认
        document.getElementById('confirm-add-concubine').addEventListener('click', () => this.addConcubine());

        // 重新开始游戏
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }

    // 开始游戏
    startGame() {
        const emperorName = document.getElementById('emperor-name').value.trim();
        const eraName = document.getElementById('era-name').value.trim();
        const dynastyName = document.getElementById('dynasty-name').value.trim();

        // 验证输入
        if (!emperorName || !eraName || !dynastyName) {
            this.showNotification('请填写完整的皇帝信息', 'warning');
            return;
        }

        if (emperorName.length > 10) {
            this.showNotification('皇帝尊号不能超过10个字', 'warning');
            return;
        }

        if (eraName.length > 6) {
            this.showNotification('年号不能超过6个字', 'warning');
            return;
        }

        if (dynastyName.length > 8) {
            this.showNotification('国号不能超过8个字', 'warning');
            return;
        }

        // 保存玩家信息
        GameState.player = {
            emperorName,
            eraName,
            dynastyName
        };

        // 重置游戏状态
        this.resetGame();

        // 验证时间状态
        this.validateTimeState();

        // 切换到游戏界面
        this.showGameScreen();

        // 添加初始历史记录
        this.addHistory('新帝登基', `${emperorName}陛下登基称帝，定年号${eraName}，开创${dynastyName}王朝`);

        // 更新显示
        this.updateTimeDisplay();
        this.updateStatusDisplay();
        this.updateSkillDisplay();
        this.renderHistory();
        this.renderTimeOptions();

        // 自动生成3个初始妃嫔
        this.generateInitialConcubines();

        this.showNotification('陛下万岁万岁万万岁！', 'success');
    }

    // 生成初始妃嫔
    generateInitialConcubines() {
        const initialConcubines = [{
                id: Date.now() + 1,
                name: '王婉容',
                title: '贵妃',
                age: 18,
                talents: ['歌舞', '诗词'],
                favor: 60
            },
            {
                id: Date.now() + 2,
                name: '李诗韵',
                title: '妃',
                age: 19,
                talents: ['书画', '音律'],
                favor: 55
            },
            {
                id: Date.now() + 3,
                name: '赵嫣然',
                title: '嫔',
                age: 17,
                talents: ['茶艺', '刺绣'],
                favor: 50
            }
        ];

        GameState.harem = initialConcubines;
        this.showNotification('后宫已有三位佳丽恭候圣驾', 'info');
    }

    // 显示游戏界面
    showGameScreen() {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
    }

    // 渲染时间段选项
    renderTimeOptions() {
        const timeOptions = GameData.timeOptions[GameState.activeTime];
        const optionsContainer = document.getElementById('event-options');

        if (!optionsContainer) {
            console.error('找不到事件选项容器');
            return;
        }

        if (!timeOptions) {
            console.error(`找不到时间段 ${GameState.activeTime} 的选项配置`);
            return;
        }

        optionsContainer.innerHTML = '';

        timeOptions.forEach(option => {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card';
            optionCard.dataset.action = option.id;

            optionCard.innerHTML = `
                <div class="option-icon">
                    <i class="${option.icon}"></i>
                </div>
                <h4>${option.name}</h4>
                <p>${option.desc}</p>
            `;

            optionCard.addEventListener('click', () => this.handleTimeOption(option.id));
            optionsContainer.appendChild(optionCard);
        });
    }

    // 更新时间显示
    updateTimeDisplay() {
        const timeStage = GameData.timeStages[GameState.currentTimeIndex];
        const timeTitle = document.getElementById('time-title');

        if (!timeTitle) return;

        timeTitle.innerHTML = `
            <i class="${timeStage.icon}" style="color: ${timeStage.color}"></i>
            ${timeStage.name}时分，陛下请选择
            <span style="font-size: 12px; color: #aaa; margin-left: 10px;">
                阶段${GameState.currentStage}/20
            </span>
        `;

        // 更新状态栏的时间显示
        const currentTimeElement = document.getElementById('current-time');
        if (currentTimeElement) {
            currentTimeElement.textContent = `${timeStage.name} (阶段${GameState.currentStage}/20)`;
        }
    }

    // 更新状态显示
    updateStatusDisplay() {
        GameUtils.updateStatusDisplay();
    }

    // 更新技能显示
    updateSkillDisplay() {
        GameUtils.updateSkillDisplay();
    }

    // 添加历史记录
    addHistory(eventType, customContent = '') {
        GameUtils.addHistory(eventType, customContent);
    }

    // 渲染历史记录
    renderHistory() {
        GameUtils.renderHistory();
    }

    // 处理时间段选项
    handleTimeOption(actionId) {
        if (GameState.gameEnded) return;

        GameState.stats.totalActions++;

        switch (actionId) {
            case 'morning_court':
                this.showMorningCourtModal();
                break;
            case 'study':
                this.showStudyModal();
                break;
            case 'martial':
                this.showMartialModal();
                break;
            case 'rest':
                this.handleRest();
                break;
            case 'harem':
                this.handleHaremVisit();
                break;
            case 'favor':
                this.handleFavorConcubine();
                break;
            case 'sleep':
                this.handleSleep();
                break;
            case 'meet_minister':
                this.handleMeetMinister();
                break;
            case 'night_study':
                this.handleNightStudy();
                break;
            default:
                this.showNotification('该功能尚未实现', 'warning');
                break;
        }
    }

    // 显示早朝模态框
    showMorningCourtModal() {
        const modal = document.getElementById('morning-court-modal');
        if (modal) modal.classList.add('active');
    }

    // 处理早朝
    handleMorningCourt() {
        // 增加技能点，上限为150
        GameState.skills.practice = Math.min(
            GameState.skills.practice + GameData.constants.SKILL_INCREMENT + GameData.constants.MORNING_COURT_BONUS,
            150
        );

        // 更新统计
        GameState.stats.courtCount++;

        // 添加历史记录
        this.addHistory('morning_court');

        // 更新显示
        this.updateSkillDisplay();
        this.renderHistory();

        // 关闭模态框并进入下一阶段
        this.hideModal(document.getElementById('morning-court-modal'));
        this.advanceTime();

        this.showNotification('早朝议事，处理国事，实践技巧+7', 'success');
    }

    // 显示学习模态框
    showStudyModal() {
        const modal = document.getElementById('study-modal');
        if (!modal) return;

        modal.classList.add('active');

        // 重置选择
        GameState.temp.selectedStudies = [];
        this.updateStudySelection();

        // 绑定学习选项点击事件
        document.querySelectorAll('.study-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.toggleStudySelection(type);
            });
        });
    }

    // 切换学习选择
    toggleStudySelection(type) {
        const index = GameState.temp.selectedStudies.indexOf(type);

        if (index === -1) {
            // 如果未选择且未达到上限，则添加
            if (GameState.temp.selectedStudies.length < GameData.constants.STUDY_LIMIT) {
                GameState.temp.selectedStudies.push(type);
            } else {
                this.showNotification('一次最多只能学习两项', 'warning');
                return;
            }
        } else {
            // 如果已选择，则移除
            GameState.temp.selectedStudies.splice(index, 1);
        }

        this.updateStudySelection();
    }

    // 更新学习选择显示
    updateStudySelection() {
        // 更新选中状态
        document.querySelectorAll('.study-option').forEach(option => {
            const type = option.dataset.type;
            if (GameState.temp.selectedStudies.includes(type)) {
                option.classList.add('selected');
                option.style.borderColor = '#d4af37';
                option.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            } else {
                option.classList.remove('selected');
                option.style.borderColor = '';
                option.style.backgroundColor = '';
            }
        });

        // 更新计数显示
        const selectedCount = document.getElementById('selected-count');
        if (selectedCount) {
            selectedCount.textContent = `已选择：${GameState.temp.selectedStudies.length}/${GameData.constants.STUDY_LIMIT}`;
        }

        // 更新确认按钮状态
        const confirmBtn = document.getElementById('confirm-study');
        if (confirmBtn) {
            confirmBtn.disabled = GameState.temp.selectedStudies.length === 0;
        }
    }

    // 确认学习
    confirmStudy() {
        if (GameState.temp.selectedStudies.length === 0) return;

        // 增加技能点
        GameState.temp.selectedStudies.forEach(type => {
            const option = GameData.studyOptions[type];
            if (option) {
                GameState.skills[option.skill] = Math.min(
                    GameState.skills[option.skill] + option.points,
                    150
                );
            }
        });

        // 更新统计
        GameState.stats.studyCount += GameState.temp.selectedStudies.length;

        // 添加历史记录
        this.addHistory('study');

        // 更新显示
        this.updateSkillDisplay();
        this.renderHistory();

        // 关闭模态框并进入下一阶段
        this.hideModal(document.getElementById('study-modal'));
        this.advanceTime();

        this.showNotification(`习文完成，获得${GameState.temp.selectedStudies.length * 5}点技能`, 'success');
    }

    // 显示习武模态框
    showMartialModal() {
        const modal = document.getElementById('martial-modal');
        if (!modal) return;

        modal.classList.add('active');

        // 重置选择
        GameState.temp.selectedMartial = null;
        this.updateMartialSelection();

        // 绑定习武选项点击事件
        document.querySelectorAll('.martial-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.selectMartialOption(type);
            });
        });
    }

    // 选择习武选项
    selectMartialOption(type) {
        GameState.temp.selectedMartial = type;
        this.updateMartialSelection();
    }

    // 更新习武选择显示
    updateMartialSelection() {
        document.querySelectorAll('.martial-option').forEach(option => {
            const type = option.dataset.type;
            if (GameState.temp.selectedMartial === type) {
                option.classList.add('selected');
                option.style.borderColor = '#d4af37';
                option.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            } else {
                option.classList.remove('selected');
                option.style.borderColor = '';
                option.style.backgroundColor = '';
            }
        });
    }

    // 确认习武
    confirmMartial() {
        if (!GameState.temp.selectedMartial) return;

        const option = GameData.martialOptions[GameState.temp.selectedMartial];
        if (option) {
            // 增加技能点
            GameState.skills[option.skill] = Math.min(
                GameState.skills[option.skill] + option.points,
                150
            );
        }

        // 更新统计
        GameState.stats.martialCount++;

        // 添加历史记录
        this.addHistory('martial');

        // 更新显示
        this.updateSkillDisplay();
        this.renderHistory();

        // 关闭模态框并进入下一阶段
        this.hideModal(document.getElementById('martial-modal'));
        this.advanceTime();

        this.showNotification(`习武完成，${option.name}，获得5点技能`, 'success');
    }

    // 处理休息
    handleRest() {
        GameState.stats.restCount++;
        this.addHistory('rest');
        this.renderHistory();
        this.advanceTime();

        this.showNotification('午休片刻，精神焕发', 'info');
    }

    // 处理逛后宫
    handleHaremVisit() {
        // 检查后宫是否为空
        if (GameState.harem.length === 0) {
            this.showNotification('后宫空无一人，请先添加妃嫔', 'warning');
            this.showAddConcubineModal();
            return;
        }

        GameState.stats.haremCount++;

        // 随机选择一个妃嫔互动
        const randomIndex = Math.floor(Math.random() * GameState.harem.length);
        const concubine = GameState.harem[randomIndex];

        // 添加历史记录
        this.addHistory('harem');

        // 增加妃嫔宠爱值
        concubine.favor += 2;

        // 更新显示
        this.renderHistory();
        this.advanceTime();

        this.showNotification(`与${concubine.title}·${concubine.name}游赏御花园，宠爱+2`, 'info');
    }

    // 显示后宫模态框
    showHaremModal() {
        const modal = document.getElementById('harem-modal');
        if (!modal) return;

        modal.classList.add('active');

        // 重置选择
        this.selectedConcubineIndex = -1;

        // 重新渲染列表
        this.renderConcubineList();

        // 更新按钮状态
        this.updateHaremButton();
    }

    // 渲染妃嫔列表
    renderConcubineList() {
            const concubineList = document.getElementById('concubine-list');
            const emptyHarem = document.getElementById('empty-harem');
            const visitBtn = document.getElementById('visit-harem');

            if (!concubineList || !emptyHarem || !visitBtn) return;

            // 清空列表
            concubineList.innerHTML = '';

            // 显示空后宫提示
            if (GameState.harem.length === 0) {
                emptyHarem.classList.remove('hidden');
                visitBtn.disabled = true;
                visitBtn.innerHTML = '<i class="fas fa-walking"></i> 后宫空无一人';
                return;
            }

            emptyHarem.classList.add('hidden');

            // 渲染妃嫔卡片
            GameState.harem.forEach((concubine, index) => {
                        const card = document.createElement('div');
                        card.className = `concubine-card ${this.selectedConcubineIndex === index ? 'selected' : ''}`;
                        card.dataset.index = index;

                        // 生成妃嫔头像（使用姓名首字）
                        const firstChar = concubine.name.charAt(0);

                        card.innerHTML = `
                <div class="concubine-avatar">${firstChar}</div>
                <div class="concubine-info">
                    <div class="concubine-name">${concubine.title} · ${concubine.name}</div>
                    <div class="concubine-details">
                        ${concubine.age}岁 | 宠爱值: ${concubine.favor}
                        <div class="favor-progress">
                            <div class="favor-progress-bar">
                                <div class="favor-progress-fill" style="width: ${Math.min(concubine.favor, 100)}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="concubine-talents">
                        ${concubine.talents.map(talent => `<span class="talent-tag">${talent}</span>`).join('')}
                    </div>
                </div>
                ${this.selectedConcubineIndex === index ? '<div class="selection-indicator"><i class="fas fa-check-circle"></i></div>' : ''}
            `;

            // 绑定点击事件
            card.addEventListener('click', () => {
                this.selectConcubine(index);
            });

            concubineList.appendChild(card);
        });
    }

    // 选择妃嫔
    selectConcubine(index) {
        // 如果已经在选择模式，就选择该妃嫔
        if (this.currentHaremMode === 'select') {
            this.selectedConcubineIndex = index;
            this.renderConcubineList();
            this.updateHaremButton();
        }
    }

    // 更新后宫按钮状态
    updateHaremButton() {
        const visitBtn = document.getElementById('visit-harem');
        if (!visitBtn) return;

        if (this.currentHaremMode === 'view') {
            visitBtn.disabled = false;
            visitBtn.innerHTML = '<i class="fas fa-walking"></i> 逛后宫';
        } else if (this.currentHaremMode === 'select') {
            if (this.selectedConcubineIndex >= 0) {
                const selectedConcubine = GameState.harem[this.selectedConcubineIndex];
                visitBtn.disabled = false;
                visitBtn.innerHTML = `<i class="fas fa-heart"></i> 临幸 ${selectedConcubine.title}·${selectedConcubine.name}`;
            } else {
                visitBtn.disabled = true;
                visitBtn.innerHTML = '<i class="fas fa-walking"></i> 请先选择妃嫔';
            }
        }
    }

    // 临幸妃嫔
    visitConcubine() {
        if (this.currentHaremMode === 'view') {
            // 逛后宫模式
            this.handleHaremVisit();
            this.hideModal(document.getElementById('harem-modal'));
            return;
        }

        // 临幸模式
        if (this.selectedConcubineIndex < 0 || this.selectedConcubineIndex >= GameState.harem.length) {
            this.showNotification('请先选择要临幸的妃嫔', 'warning');
            return;
        }

        const concubine = GameState.harem[this.selectedConcubineIndex];
        
        console.log('临幸妃嫔:', concubine.name);

        // 更新统计
        GameState.stats.favorCount++;
        GameState.stats.totalActions++;

        // 记录选中的妃嫔名称用于历史记录
        const concubineName = `${concubine.title}${concubine.name}`;

        // 添加历史记录
        const favorHistory = `陛下今夜临幸${concubineName}，恩爱有加。`;
        this.addHistory('favor', favorHistory);

        // 增加妃嫔宠爱值
        concubine.favor += GameData.constants.FAVOR_BONUS;

        // 检查是否需要提升位份（宠爱值达到100）
        if (concubine.favor >= 100) {
            this.promoteConcubine(concubine);
        }

        // 更新显示
        this.renderHistory();

        // 创建临幸特效
        this.createFavorEffect(concubine);

        // 重置选择状态
        this.selectedConcubineIndex = -1;

        // 显示成功消息
        this.showNotification(`临幸${concubineName}，宠爱+3`, 'info');

        // 延迟关闭模态框并进入下一阶段
        setTimeout(() => {
            this.hideModal(document.getElementById('harem-modal'));
            this.advanceTime();
            
            // 重新渲染列表
            setTimeout(() => {
                this.renderConcubineList();
                this.updateHaremButton();
            }, 100);
        }, 1500);
    }

    // 创建临幸特效
    createFavorEffect(concubine) {
        const effectElement = document.createElement('div');
        effectElement.className = 'favor-effect';
        effectElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            text-align: center;
            color: #fff;
            font-size: 2rem;
        `;

        effectElement.innerHTML = `
            <div style="background: rgba(232, 62, 140, 0.9); padding: 30px; border-radius: 15px;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                    <div style="font-size: 3rem;">💝</div>
                    <div style="font-size: 2rem; color: #ffd700;">临幸</div>
                    <div style="font-size: 3rem;">💝</div>
                </div>
                <div style="font-size: 1.5rem; margin-top: 10px; color: #fff;">
                    ${concubine.title}${concubine.name}
                </div>
                <div style="font-size: 1.2rem; margin-top: 10px; color: #e83e8c;">
                    宠爱值 +${GameData.constants.FAVOR_BONUS}
                </div>
            </div>
        `;

        document.body.appendChild(effectElement);

        // 动画结束后移除元素
        setTimeout(() => {
            if (effectElement.parentNode) {
                effectElement.parentNode.removeChild(effectElement);
            }
        }, 2000);
    }

    // 提升妃嫔位份
    promoteConcubine(concubine) {
        const titleLevels = GameData.titleLevels;
        const currentTitleIndex = titleLevels.findIndex(t => t.title === concubine.title);

        // 如果不是最高位份，可以提升
        if (currentTitleIndex > 0 && currentTitleIndex < titleLevels.length - 1) {
            const newTitle = titleLevels[currentTitleIndex - 1].title;
            const oldTitle = concubine.title;
            concubine.title = newTitle;
            concubine.favor = 60; // 提升后宠爱值重置为60

            // 添加晋升历史记录
            const promoteHistory = `${oldTitle}${concubine.name}因受宠爱，晋封为${newTitle}。`;
            this.addHistory('favor', promoteHistory);

            this.showNotification(`${oldTitle}${concubine.name}晋封为${newTitle}！`, 'success');
        }
    }

    // 显示添加妃嫔模态框
    showAddConcubineModal() {
        const modal = document.getElementById('add-concubine-modal');
        if (!modal) return;

        modal.classList.add('active');

        // 重置表单
        const concubineNameInput = document.getElementById('concubine-name');
        const concubineTitleSelect = document.getElementById('concubine-title');
        const concubineAgeInput = document.getElementById('concubine-age');

        if (concubineNameInput) concubineNameInput.value = '';
        if (concubineTitleSelect) concubineTitleSelect.value = '贵妃';
        if (concubineAgeInput) concubineAgeInput.value = GameData.constants.DEFAULT_CONCUBINE_AGE;

        document.querySelectorAll('input[name="talent"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // 添加妃嫔
    addConcubine() {
        const nameInput = document.getElementById('concubine-name');
        const titleSelect = document.getElementById('concubine-title');
        const ageInput = document.getElementById('concubine-age');

        if (!nameInput || !titleSelect || !ageInput) return;

        const name = nameInput.value.trim();
        const title = titleSelect.value;
        const age = parseInt(ageInput.value);

        // 验证输入
        if (!name) {
            this.showNotification('请输入妃嫔姓名', 'warning');
            return;
        }

        if (name.length > 6) {
            this.showNotification('妃嫔姓名不能超过6个字', 'warning');
            return;
        }

        if (age < GameData.constants.MIN_CONCUBINE_AGE || age > GameData.constants.MAX_CONCUBINE_AGE) {
            this.showNotification(`年龄必须在${GameData.constants.MIN_CONCUBINE_AGE}-${GameData.constants.MAX_CONCUBINE_AGE}岁之间`, 'warning');
            return;
        }

        // 获取选中的特长
        const talents = [];
        document.querySelectorAll('input[name="talent"]:checked').forEach(checkbox => {
            talents.push(checkbox.value);
        });

        // 如果没有选择特长，添加默认
        if (talents.length === 0) {
            talents.push('无特长');
        }

        // 创建妃嫔对象
        const concubine = {
            id: Date.now() + Math.random(),
            name: name,
            title: title,
            age: age,
            talents: talents,
            favor: 50
        };

        // 添加到后宫
        GameState.harem.push(concubine);

        // 关闭模态框
        this.hideModal(document.getElementById('add-concubine-modal'));

        // 更新统计
        GameState.stats.haremCount++;

        // 立即更新后宫列表显示
        this.renderConcubineList();

        // 显示成功消息
        this.showNotification(`册封${title}·${name}成功，后宫现已有${GameState.harem.length}位佳丽`, 'success');
    }

    // 处理面见大臣
    handleMeetMinister() {
        // 增加实践技巧
        GameState.skills.practice = Math.min(
            GameState.skills.practice + GameData.constants.SKILL_INCREMENT,
            150
        );

        // 更新统计
        GameState.stats.meetMinisterCount++;

        // 添加历史记录
        this.addHistory('meet_minister');

        // 更新显示
        this.updateSkillDisplay();
        this.renderHistory();
        this.advanceTime();

        this.showNotification('与大臣商议国事，实践技巧+5', 'success');
    }

    // 处理夜读
    handleNightStudy() {
        // 增加人文素养
        GameState.skills.human = Math.min(
            GameState.skills.human + GameData.constants.SKILL_INCREMENT,
            150
        );

        // 更新统计
        GameState.stats.studyCount++;

        // 添加历史记录
        this.addHistory('night_study');

        // 更新显示
        this.updateSkillDisplay();
        this.renderHistory();
        this.advanceTime();

        this.showNotification('挑灯夜读，人文素养+5', 'success');
    }

    // 处理宠幸妃嫔
    handleFavorConcubine() {
        // 检查后宫是否为空
        if (GameState.harem.length === 0) {
            this.showNotification('后宫空无一人，请先添加妃嫔', 'warning');
            this.showAddConcubineModal();
            return;
        }

        // 设置为选择模式并显示后宫模态框
        this.currentHaremMode = 'select';
        this.selectedConcubineIndex = -1;
        
        // 显示后宫选择模态框
        this.showHaremModal();
    }

    // 处理就寝
    handleSleep() {
        console.log('陛下就寝，处理时间推进');

        // 添加历史记录
        this.addHistory('sleep');
        this.renderHistory();

        // 统一使用advanceTime来处理时间推进
        this.advanceTime();

        this.showNotification('养精蓄锐，明日再战', 'info');
    }

    // 统一的时间推进方法
    advanceTime() {
        console.log(`推进时间前: 阶段=${GameState.currentStage}, 时间索引=${GameState.currentTimeIndex}, 当前时间=${GameState.activeTime}`);

        // 检查当前时间段是否结束
        if (GameState.currentTimeIndex < GameData.timeStages.length - 1) {
            // 进入下一个时间段
            GameState.currentTimeIndex++;
            GameState.activeTime = GameData.timeStages[GameState.currentTimeIndex].id;

            const newTimeStage = GameData.timeStages[GameState.currentTimeIndex];
            console.log(`推进到下一个时间段: 索引=${GameState.currentTimeIndex}, 时间名称=${newTimeStage.name}, activeTime=${GameState.activeTime}`);

            // 更新显示
            this.updateTimeDisplay();
            this.updateStatusDisplay();
            this.renderTimeOptions();
        } else {
            // 如果是晚上最后一个阶段，进入下一天
            console.log('今天所有时间段结束，进入下一天');
            this.advanceToNextDay();
        }

        console.log(`时间推进完成: 阶段=${GameState.currentStage}, 时间索引=${GameState.currentTimeIndex}, 当前时间=${GameState.activeTime}`);
    }

    // 进入下一天
    advanceToNextDay() {
        console.log('========== 进入下一天 ==========');

        // 重置时间（从清晨开始）
        GameState.currentTimeIndex = 0;
        GameState.activeTime = GameData.timeStages[0].id;

        // 进入下一个阶段（一年）
        GameState.currentStage++;

        console.log(`新的一天: 阶段=${GameState.currentStage}, 重置时间到清晨`);

        // 检查游戏是否结束（20阶段）
        if (GameState.currentStage > GameData.constants.TOTAL_STAGES) {
            console.log('游戏结束，20阶段完成');
            this.showEnding();
            return;
        }

        // 更新状态显示
        this.updateTimeDisplay();
        this.updateStatusDisplay();
        this.renderTimeOptions();

        // 每天开始时检查是否有事件
        this.checkDailyEvents();

        // 添加新的一天开始的历史记录
        const newDayHistory = `第${GameState.currentStage}阶段开始，陛下开始处理政务。`;
        this.addHistory('morning_court', newDayHistory);

        console.log('下一天设置完成');
    }

    // 添加时间状态验证方法
    validateTimeState() {
        console.log('=== 时间状态验证 ===');
        console.log(`当前阶段: ${GameState.currentStage}/20`);
        console.log(`时间索引: ${GameState.currentTimeIndex}`);
        console.log(`当前时间: ${GameState.activeTime}`);

        // 验证时间索引是否有效
        if (GameState.currentTimeIndex < 0 || GameState.currentTimeIndex >= GameData.timeStages.length) {
            console.error('时间索引无效!');
            GameState.currentTimeIndex = 0;
            GameState.activeTime = GameData.timeStages[0].id;
        }

        // 验证当前时间是否匹配
        const expectedTime = GameData.timeStages[GameState.currentTimeIndex].id;
        if (GameState.activeTime !== expectedTime) {
            console.warn(`当前时间不匹配: ${GameState.activeTime} != ${expectedTime}, 正在修正...`);
            GameState.activeTime = expectedTime;
        }

        console.log('=== 验证完成 ===');
    }

    // 检查每日事件
    checkDailyEvents() {
        // 每3天自动生成一个妃嫔（最多10个）
        if (GameState.currentStage % 3 === 0 && GameState.harem.length < 10) {
            const newConcubine = this.generateRandomConcubine();
            GameState.harem.push(newConcubine);
            this.showNotification(`新进秀女${newConcubine.name}入宫，封为${newConcubine.title}`, 'info');
        }
    }

    // 生成随机妃嫔
    generateRandomConcubine() {
        return GameUtils.generateRandomConcubine();
    }

    // 显示结局
    showEnding() {
        GameState.gameEnded = true;

        // 计算结局评价
        const evaluation = this.calculateEndingEvaluation();

        // 更新结局显示
        const endingTitle = document.getElementById('ending-title');
        const emperorEvaluation = document.getElementById('emperor-evaluation');
        const dynastyEvaluation = document.getElementById('dynasty-evaluation');
        const endingDescription = document.getElementById('ending-description');

        if (endingTitle) endingTitle.textContent = `二十载春秋，终有定论 - ${GameState.player.emperorName}陛下`;
        if (emperorEvaluation) emperorEvaluation.textContent = evaluation.emperor.title;
        if (dynastyEvaluation) dynastyEvaluation.textContent = evaluation.dynasty.title;
        if (endingDescription) endingDescription.innerHTML = `
            <p>${evaluation.emperor.description}</p>
            <p style="margin-top: 15px; color: #ffd700;">${evaluation.dynasty.description}</p>
        `;

        // 更新统计数据
        const endingHuman = document.getElementById('ending-human');
        const endingPractice = document.getElementById('ending-practice');
        const endingPhysical = document.getElementById('ending-physical');
        const endingRatio = document.getElementById('ending-ratio');

        if (endingHuman) endingHuman.textContent = GameState.skills.human;
        if (endingPractice) endingPractice.textContent = GameState.skills.practice;
        if (endingPhysical) endingPhysical.textContent = GameState.skills.physical;
        if (endingRatio) endingRatio.textContent = `${(evaluation.ratio * 100).toFixed(1)}%`;

        // 根据评价设置图标
        const endingIcon = document.getElementById('ending-icon');
        if (endingIcon) {
            if (evaluation.ratio >= 0.75) {
                endingIcon.className = 'fas fa-crown';
                endingIcon.style.color = '#FFD700';
            } else if (evaluation.ratio >= 0.45) {
                endingIcon.className = 'fas fa-balance-scale';
                endingIcon.style.color = '#87CEEB';
            } else {
                endingIcon.className = 'fas fa-skull-crossbones';
                endingIcon.style.color = '#DC3545';
            }
        }

        // 显示结局模态框
        const modal = document.getElementById('ending-modal');
        if (modal) modal.classList.add('active');
    }

    // 计算结局评价
    calculateEndingEvaluation() {
        return GameUtils.getEndingEvaluation();
    }

    // 重新开始游戏
    restartGame() {
        // 清除本地存档
        localStorage.removeItem('emperorGameSave');
        
        // 重置游戏状态
        this.resetGame();

        // 隐藏结局模态框
        this.hideModal(document.getElementById('ending-modal'));

        // 回到登录界面
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('login-screen').classList.add('active');

        // 清空输入框
        const emperorNameInput = document.getElementById('emperor-name');
        const eraNameInput = document.getElementById('era-name');
        const dynastyNameInput = document.getElementById('dynasty-name');

        if (emperorNameInput) emperorNameInput.value = '';
        if (eraNameInput) eraNameInput.value = '';
        if (dynastyNameInput) dynastyNameInput.value = '';

        this.showNotification('新的征程即将开始', 'info');
    }

    // 隐藏模态框
    hideModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    // 显示通知
    showNotification(message, type = 'info') {
        GameUtils.showNotification(message, type);
    }
}

// 游戏启动
document.addEventListener('DOMContentLoaded', () => {
    window.game = new EmperorGame();

    // 添加一些初始帮助提示
    setTimeout(() => {
        const randomTip = GameData.tips[Math.floor(Math.random() * GameData.tips.length)];
        window.game.showNotification(`提示：${randomTip}`, 'info');
    }, 3000);
});

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // ESC键关闭所有模态框
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // F5键保存游戏
    if (e.key === 'F5') {
        e.preventDefault();
        if (window.game) {
            window.game.saveGame();
            window.game.showNotification('游戏进度已保存', 'success');
        }
    }

    // F1键显示帮助
    if (e.key === 'F1') {
        e.preventDefault();
        if (window.game) {
            const randomTip = GameData.tips[Math.floor(Math.random() * GameData.tips.length)];
            window.game.showNotification(`帮助：${randomTip}`, 'info');
        }
    }
});
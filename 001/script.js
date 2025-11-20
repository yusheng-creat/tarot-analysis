class TarotReader {
    constructor() {
        this.selectedSpread = 'single';
        this.drawnCards = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.selectSpread('single');
    }

    bindEvents() {
        // 牌阵选择
        document.querySelectorAll('.spread-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectSpread(e.target.dataset.spread);
            });
        });

        // 抽牌按钮
        document.getElementById('drawCards').addEventListener('click', () => {
            this.drawCards();
        });
    }

    selectSpread(spreadType) {
        this.selectedSpread = spreadType;
        
        // 更新按钮状态
        document.querySelectorAll('.spread-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-spread="${spreadType}"]`).classList.add('active');
        
        // 隐藏结果
        document.getElementById('result').style.display = 'none';
    }

    drawCards() {
        const question = document.getElementById('question').value.trim();
        if (!question) {
            alert('请先输入你的问题');
            return;
        }

        const spread = spreads[this.selectedSpread];
        const numCards = spread.positions.length;
        
        // 随机抽取牌
        this.drawnCards = this.getRandomCards(numCards);
        
        // 显示结果
        this.displayResults(spread);
    }

    getRandomCards(num) {
        const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, num).map(card => ({
            ...card,
            reversed: Math.random() < 0.3 // 30% 概率逆位
        }));
    }

    displayResults(spread) {
        const resultSection = document.getElementById('result');
        const cardsDisplay = document.getElementById('cards-display');
        const interpretation = document.getElementById('interpretation');

        // 清空之前的结果
        cardsDisplay.innerHTML = '';
        interpretation.innerHTML = '';

        // 显示牌
        this.drawnCards.forEach((card, index) => {
            const cardElement = this.createCardElement(card, spread.positions[index]);
            cardsDisplay.appendChild(cardElement);
        });

        // 生成解读
        const interpretationContent = this.generateInterpretation(spread);
        interpretation.innerHTML = interpretationContent;

        // 显示结果区域
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    createCardElement(card, position) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${card.reversed ? 'reversed' : ''}`;
        
        cardDiv.innerHTML = `
            <div class="card-position">${position}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-suit">${card.suit}</div>
            ${card.reversed ? '<div style="font-size: 0.7rem; margin-top: 10px;">逆位</div>' : ''}
        `;
        
        return cardDiv;
    }

    generateInterpretation(spread) {
        const question = document.getElementById('question').value;
        
        let html = `
            <div class="interpretation">
                <h4>问题：${question}</h4>
                <p><strong>牌阵：</strong>${spread.name} - ${spread.description}</p>
        `;

        // 单独解读每张牌
        this.drawnCards.forEach((card, index) => {
            const position = spread.positions[index];
            const meaning = card.reversed ? card.reversed : card.upright;
            
            html += `
                <div class="card-meaning">
                    <h5>${position}：${card.name} ${card.reversed ? '(逆位)' : ''}</h5>
                    <p><strong>关键词：</strong>${meaning.keywords.join('、')}</p>
                    <p>${meaning.meaning}</p>
                </div>
            `;
        });

        // 整体解读
        html += this.generateOverallReading(spread);
        html += '</div>';
        
        return html;
    }

    generateOverallReading(spread) {
        let overall = '<div class="card-meaning"><h5>整体解读</h5>';
        
        if (spread.name === '单张牌') {
            const card = this.drawnCards[0];
            overall += `<p>这张${card.name}为你的问题提供了直接的指导。`;
            if (card.reversed) {
                overall += '逆位的出现提醒你需要从不同角度思考问题，或者注意可能的阻碍。';
            } else {
                overall += '正位显示了积极的能量和前进的方向。';
            }
            overall += '</p>';
        } else if (spread.name === '三张牌阵') {
            overall += '<p>从过去到未来的发展脉络显示：';
            overall += `过去的${this.drawnCards[0].name}影响了现在的${this.drawnCards[1].name}，`;
            overall += `而未来的${this.drawnCards[2].name}指向了可能的结果。`;
            overall += '关注现在的状况，它是连接过去和未来的关键。</p>';
        } else if (spread.name === '凯尔特十字') {
            overall += '<p>这个复杂的牌阵揭示了问题的多个层面。';
            overall += `核心问题由${this.drawnCards[0].name}代表，`;
            overall += `主要挑战是${this.drawnCards[1].name}。`;
            overall += `最终结果${this.drawnCards[9].name}显示了事情的可能走向。`;
            overall += '综合所有牌面信息，制定你的行动计划。</p>';
        }
        
        overall += '<p><em>记住，塔罗牌提供的是指导和洞察，最终的决定权在你手中。相信你的直觉，结合牌面信息做出最适合的选择。</em></p>';
        overall += '</div>';
        
        return overall;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new TarotReader();
});
// 塔罗牌数据
const tarotCards = [
    // 大阿卡纳
    {
        name: "愚者",
        suit: "大阿卡纳",
        number: 0,
        upright: {
            keywords: ["新开始", "冒险", "纯真", "自由"],
            meaning: "愚者代表新的开始和无限的可能性。这是一张充满希望和冒险精神的牌，暗示你即将踏上一段新的人生旅程。"
        },
        reversed: {
            keywords: ["鲁莽", "缺乏计划", "愚蠢的决定"],
            meaning: "逆位的愚者提醒你要更加谨慎，避免做出冲动的决定。需要更多的思考和准备。"
        }
    },
    {
        name: "魔术师",
        suit: "大阿卡纳",
        number: 1,
        upright: {
            keywords: ["意志力", "创造力", "技能", "专注"],
            meaning: "魔术师象征着将想法转化为现实的能力。你拥有所需的技能和资源来实现目标。"
        },
        reversed: {
            keywords: ["缺乏专注", "被操纵", "能力不足"],
            meaning: "逆位的魔术师暗示你可能缺乏专注力或被他人操纵。需要重新审视自己的能力和目标。"
        }
    },
    {
        name: "女祭司",
        suit: "大阿卡纳",
        number: 2,
        upright: {
            keywords: ["直觉", "神秘", "内在智慧", "潜意识"],
            meaning: "女祭司代表内在的智慧和直觉。她提醒你要倾听内心的声音，相信自己的直觉。"
        },
        reversed: {
            keywords: ["忽视直觉", "缺乏内省", "表面化"],
            meaning: "逆位的女祭司表示你可能忽视了内在的声音，需要更多的内省和冥想。"
        }
    },
    {
        name: "皇后",
        suit: "大阿卡纳",
        number: 3,
        upright: {
            keywords: ["丰饶", "母性", "创造力", "自然"],
            meaning: "皇后象征着丰饶和创造力。她代表母性的力量和对生命的滋养。"
        },
        reversed: {
            keywords: ["创造力受阻", "依赖性", "缺乏自信"],
            meaning: "逆位的皇后可能表示创造力受到阻碍，或者过度依赖他人。"
        }
    },
    {
        name: "皇帝",
        suit: "大阿卡纳",
        number: 4,
        upright: {
            keywords: ["权威", "结构", "控制", "稳定"],
            meaning: "皇帝代表权威和秩序。他象征着通过纪律和结构来实现目标的能力。"
        },
        reversed: {
            keywords: ["专制", "缺乏纪律", "权力滥用"],
            meaning: "逆位的皇帝可能表示权力的滥用或缺乏必要的纪律和结构。"
        }
    },
    {
        name: "教皇",
        suit: "大阿卡纳",
        number: 5,
        upright: {
            keywords: ["传统", "精神指导", "学习", "宗教"],
            meaning: "教皇代表传统智慧和精神指导。他提醒你寻求导师的帮助和传统的智慧。"
        },
        reversed: {
            keywords: ["反叛", "非传统", "个人信仰"],
            meaning: "逆位的教皇表示对传统的反叛，或者寻求个人化的精神道路。"
        }
    },
    {
        name: "恋人",
        suit: "大阿卡纳",
        number: 6,
        upright: {
            keywords: ["爱情", "关系", "选择", "和谐"],
            meaning: "恋人牌代表爱情和重要的关系。它也象征着人生中的重要选择。"
        },
        reversed: {
            keywords: ["关系问题", "错误选择", "不和谐"],
            meaning: "逆位的恋人可能表示关系中的问题或做出了错误的选择。"
        }
    },
    {
        name: "战车",
        suit: "大阿卡纳",
        number: 7,
        upright: {
            keywords: ["胜利", "意志力", "控制", "决心"],
            meaning: "战车象征着通过意志力和决心获得胜利。你有能力克服障碍。"
        },
        reversed: {
            keywords: ["缺乏控制", "失败", "方向迷失"],
            meaning: "逆位的战车表示缺乏控制或方向感，需要重新找到平衡。"
        }
    },
    {
        name: "力量",
        suit: "大阿卡纳",
        number: 8,
        upright: {
            keywords: ["内在力量", "勇气", "耐心", "同情"],
            meaning: "力量牌代表内在的力量和勇气。它提醒你用温柔和耐心来面对挑战。"
        },
        reversed: {
            keywords: ["软弱", "缺乏信心", "内在冲突"],
            meaning: "逆位的力量表示内在的软弱或缺乏自信，需要重新找到内在的力量。"
        }
    },
    {
        name: "隐者",
        suit: "大阿卡纳",
        number: 9,
        upright: {
            keywords: ["内省", "寻求真理", "指导", "孤独"],
            meaning: "隐者代表内省和寻求真理的过程。有时需要独处来找到答案。"
        },
        reversed: {
            keywords: ["孤立", "拒绝帮助", "迷失方向"],
            meaning: "逆位的隐者可能表示过度孤立或拒绝他人的帮助和指导。"
        }
    },
    // 小阿卡纳 - 权杖（火元素）
    {
        name: "权杖王牌",
        suit: "权杖",
        number: 1,
        upright: {
            keywords: ["新项目", "创造力", "灵感", "潜力"],
            meaning: "权杖王牌代表新的创意项目或事业的开始。充满了创造力和潜在的能量。"
        },
        reversed: {
            keywords: ["缺乏方向", "创意受阻", "延迟"],
            meaning: "逆位表示创意受阻或新项目面临延迟，需要重新审视方向。"
        }
    },
    {
        name: "权杖二",
        suit: "权杖",
        number: 2,
        upright: {
            keywords: ["规划", "个人力量", "未来计划"],
            meaning: "权杖二表示你正在制定长远计划，拥有个人力量来实现目标。"
        },
        reversed: {
            keywords: ["缺乏规划", "恐惧", "个人目标不明"],
            meaning: "逆位表示缺乏明确的规划或对未来感到恐惧。"
        }
    },
    // 小阿卡纳 - 圣杯（水元素）
    {
        name: "圣杯王牌",
        suit: "圣杯",
        number: 1,
        upright: {
            keywords: ["新的爱情", "情感满足", "精神觉醒"],
            meaning: "圣杯王牌代表新的情感开始，可能是爱情、友谊或精神上的满足。"
        },
        reversed: {
            keywords: ["情感封闭", "失望", "精神空虚"],
            meaning: "逆位表示情感上的封闭或精神上的空虚感。"
        }
    },
    {
        name: "圣杯二",
        suit: "圣杯",
        number: 2,
        upright: {
            keywords: ["伙伴关系", "爱情", "相互吸引", "统一"],
            meaning: "圣杯二象征着和谐的伙伴关系和相互的吸引力。"
        },
        reversed: {
            keywords: ["关系不平衡", "误解", "分离"],
            meaning: "逆位表示关系中的不平衡或误解。"
        }
    },
    // 小阿卡纳 - 宝剑（风元素）
    {
        name: "宝剑王牌",
        suit: "宝剑",
        number: 1,
        upright: {
            keywords: ["新想法", "心智清晰", "突破", "真理"],
            meaning: "宝剑王牌代表新的想法和心智上的突破，真理将会显现。"
        },
        reversed: {
            keywords: ["思维混乱", "缺乏清晰度", "误解"],
            meaning: "逆位表示思维混乱或缺乏清晰的判断力。"
        }
    },
    {
        name: "宝剑二",
        suit: "宝剑",
        number: 2,
        upright: {
            keywords: ["艰难决定", "平衡", "僵局"],
            meaning: "宝剑二表示面临艰难的决定，需要仔细权衡各种选择。"
        },
        reversed: {
            keywords: ["决策困难", "信息不足", "内心冲突"],
            meaning: "逆位表示决策更加困难，可能缺乏足够的信息。"
        }
    },
    // 小阿卡纳 - 金币（土元素）
    {
        name: "金币王牌",
        suit: "金币",
        number: 1,
        upright: {
            keywords: ["新机会", "物质成功", "繁荣", "安全感"],
            meaning: "金币王牌代表新的物质机会和潜在的繁荣。"
        },
        reversed: {
            keywords: ["错失机会", "物质损失", "缺乏安全感"],
            meaning: "逆位表示可能错失机会或面临物质上的挑战。"
        }
    },
    {
        name: "金币二",
        suit: "金币",
        number: 2,
        upright: {
            keywords: ["平衡", "适应性", "时间管理"],
            meaning: "金币二表示需要在多个责任之间保持平衡。"
        },
        reversed: {
            keywords: ["失去平衡", "过度承诺", "时间管理不当"],
            meaning: "逆位表示失去平衡，可能承担了过多的责任。"
        }
    }
];

// 牌阵配置
const spreads = {
    single: {
        name: "单张牌",
        positions: ["当前状况"],
        description: "简单直接的指导，适合日常问题"
    },
    three: {
        name: "三张牌阵",
        positions: ["过去", "现在", "未来"],
        description: "了解事情的发展脉络"
    },
    celtic: {
        name: "凯尔特十字",
        positions: [
            "当前状况", "挑战", "远程过去", "近期过去", 
            "可能的未来", "近期未来", "你的方法", "外在影响", 
            "希望与恐惧", "最终结果"
        ],
        description: "全面深入的分析，适合重要决定"
    }
};
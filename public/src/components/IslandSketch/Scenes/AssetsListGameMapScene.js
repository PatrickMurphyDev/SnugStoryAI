import AnimatedSpriteEntity from "../Entities/AnimatedSpriteEntity";

const AssetsListGameMapScene = function LoadAssetsGameMapScene(parentAssetsDict,that,charPos) {
        
        that.bgImage = parentAssetsDict["GameMapScene"]["BGImage"];
        that.WaveSpriteSheet = parentAssetsDict["GameMapScene"]["WaveSpriteSheet"];
        // TEMP NPC OTHER CHARS
        that.AnimatedSprites.push(
            new AnimatedSpriteEntity(
                "as2323",
                parentAssetsDict["GameMapScene"]["OtherCharSheet"],
                charPos.x,
                charPos.y,
                { width: 24, height: 32 },
                { columns: 3, rows: 4 },
                1, // frame offset
                -1, // speed
                2 // row
            )
        );
        
        that.AnimatedSprites.push(
            new AnimatedSpriteEntity(
                "as2323",
                parentAssetsDict["GameMapScene"]["OtherCharSheet2"],
                charPos.x+3*32,
                charPos.y-8-32*4,
                { width: 24, height: 32 },
                { columns: 3, rows: 4 },
                1, // frame offset
                -1, // speed
                2 // row
            )
        );

        that.playerImage = parentAssetsDict["GameMapScene"]["PlayerImage"];
        that.playerImageLeft = parentAssetsDict["GameMapScene"]["PlayerImageLeft"];
        that.playerImageRight =
            parentAssetsDict["GameMapScene"]["PlayerImageRight"];

        that.otherPlayerImage =
            parentAssetsDict["GameMapScene"]["OtherPlayerImage"];
        that.otherPlayerProfileImage =
            parentAssetsDict["GameMapScene"]["OtherPlayerProfileImage"];

        that.PlayerProfileImage =
            parentAssetsDict["GameMapScene"]["PlayerProfileImage"];
        that.GameMapSceneUI = parentAssetsDict["GameMapScene"]["GameMapSceneUI"];
        that.GameMapSceneUIBanner =
            parentAssetsDict["GameMapScene"]["GameMapSceneUIBanner"];

            that.AnimatedSprites.push(
                new AnimatedSpriteEntity(
                    "as2324",
                    parentAssetsDict["GameMapScene"]["WaveSpriteSheet"],
                    640 + 32,
                    1728,
                    { width: 32, height: 32 },
                    { columns: 4, rows: 1 },
                    1
                )
            );
            that.AnimatedSprites.push(
                new AnimatedSpriteEntity(
                    "as2325554",
                    parentAssetsDict["GameMapScene"]["WaveSpriteSheet"],
                    charPos.x + 8 + 13*32,
                    charPos.y + 12 - 15*32,
                    { width: 32, height: 32 },
                    { columns: 4, rows: 1 },
                    1
                )
            );
        that.CharRunUp = new AnimatedSpriteEntity(
            "as2326",
            parentAssetsDict["GameMapScene"]["NewCharSheet"],
            0,
            0,
            { width: 24, height: 32 },
            { columns: 3, rows: 4 },
            0,
            10,
            0
        );
        that.CharRunRight = new AnimatedSpriteEntity(
            "as2327",
            parentAssetsDict["GameMapScene"]["NewCharSheet"],
            0,
            0,
            { width: 24, height: 32 },
            { columns: 3, rows: 4 },
            0,
            10,
            1
        );
        that.CharRunDown = new AnimatedSpriteEntity(
            "as2328",
            parentAssetsDict["GameMapScene"]["NewCharSheet"],
            0,
            0,
            { width: 24, height: 32 },
            { columns: 3, rows: 4 },
            0,
            10,
            2
        );
        that.CharRunLeft = new AnimatedSpriteEntity(
            "as2329",
            parentAssetsDict["GameMapScene"]["NewCharSheet"],
            0,
            0,
            { width: 24, height: 32 },
            { columns: 3, rows: 4 },
            0,
            10,
            3
        );
        that.CharIdle = new AnimatedSpriteEntity(
            "as2335",
            parentAssetsDict["GameMapScene"]["NewCharSheet"],
            0,
            0,
            { width: 24, height: 32 },
            { columns: 3, rows: 4 },
            1,
            0,
            2
        );
    }

export default AssetsListGameMapScene;
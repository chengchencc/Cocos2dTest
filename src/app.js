
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                //alert("Menu is clicked");
                if(cc.audioEngine.isMusicPlaying()){
                    //cc.audioEngine.stopMusic();
                    cc.audioEngine.pauseMusic();
                }else{
                    cc.audioEngine.resumeMusic();
                }
                if(this.sprite.isActionRun){
                    this.sprite.pause();
                    //this.sprite.runAction(cc.Hide.create());

                    this.sprite.isActionRun = false;

                }else{
                    this.sprite.resume();
                    //this.sprite.runAction(cc.Show.create());
                    this.sprite.isActionRun = true;
                }
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = cc.LabelTTF.create("cc Cocos2d-html5 test", "Times New Roman", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create(res.HelloWorld_png,cc.rect(0,0,800,400));
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(0, 0);
        var rotateToB = cc.RotateTo.create(3,180);
        var rotateToC = cc.RotateTo.create(2,360);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);
        var scaleToB = cc.ScaleTo.create(2, 0.5, 0.5);
        this.sprite.isActionRun = true;
        this.sprite.runAction(cc.Sequence.create(rotateToA,scaleToA,rotateToB,scaleToB,rotateToC).repeatForever());

        this.sprite.runAction(cc.Hide.create());
        this.sprite.runAction(cc.Show.create());
        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //this.scheduleUpdate();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
        cc.audioEngine.playMusic(res.BackgroundMusic, true);
    }
});


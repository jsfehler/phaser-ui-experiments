var config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    var assetRoot = '../../assets/player_select/';
    this.load.image("background", assetRoot + "bg.png");

    this.load.image("randoIcon", assetRoot + "random.png");

    this.load.image("pakpaoIcon", assetRoot + "pakpao.png");
    this.load.image("kidIcon", assetRoot + "kid.png");
    this.load.image("joanIcon", assetRoot + "joan.png");
    this.load.image("messengerIcon", assetRoot + "messenger.png");

    this.load.image("nameBoxLeft", assetRoot + "name_box_left.png");
    this.load.image("nameBoxRight", assetRoot + "name_box_right.png");

    this.load.image("portraitBoxLeft", assetRoot + "portrait_box_left.png");
    this.load.image("portraitBoxRight", assetRoot + "portrait_box_right.png");

    this.load.spritesheet(
        'selectHover', assetRoot + 'select_hover.png', { frameWidth: 40, frameHeight: 32 },
    );
}

function create() {
    this.anims.create(
      {
        key: 'hover',
        frames: this.anims.generateFrameNumbers('selectHover', {start: 0, end: 11}),
        frameRate: 12,
        repeat: -1,

      }
    )

    // Add background
    this.add.image(0, 0, "background").setOrigin(0.0, 0.0);

    // Create rows
    var centerX = this.cameras.main.centerX - (40 * 3) / 2;
    var rowA = new uiWidgets.Row(this, centerX + 40, 54);
    var rowB = new uiWidgets.Row(this, centerX, 80);
    var rowC = new uiWidgets.Row(this, centerX + 10, 116);

    // Create player select buttons
    var randoButton = new uiWidgets.Button(this, 0, 0, "randoIcon");
    randoButton.characterName = 'Random';
    randoButton.upEvent = ()=>{};
    randoButton.downEvent = ()=>{};

    var pakpaoButton = new uiWidgets.Button(this, 0, 0, "pakpaoIcon");
    pakpaoButton.characterName = 'Pakpao';
    pakpaoButton.upEvent = ()=>{};
    pakpaoButton.downEvent = ()=>{};

    var kidButton = new uiWidgets.Button(this, 0, 0, "kidIcon");
    kidButton.characterName = 'Canuckle Kid';
    kidButton.upEvent = ()=>{};
    kidButton.downEvent = ()=>{};

    var joanButton = new uiWidgets.Button(this, 0, 0, "joanIcon");
    joanButton.characterName = 'Joan the Drifter';
    joanButton.upEvent = ()=>{};
    joanButton.downEvent = ()=>{};

    var messengerButton = new uiWidgets.Button(this, 0, 0, "messengerIcon");
    messengerButton.characterName = 'The Messenger';
    messengerButton.upEvent = ()=>{};
    messengerButton.downEvent = ()=>{};

    var randoButton2 = new uiWidgets.Button(this, 0, 0, "randoIcon");
    randoButton2.characterName = 'Random';
    randoButton2.upEvent = ()=>{};
    randoButton2.downEvent = ()=>{};

    this.playerButtons = [
      randoButton, pakpaoButton, kidButton, joanButton, messengerButton, randoButton2,
    ];

    // Add hover effect
    //for (var i=0; i < this.playerButtons.length; i++) {
    //  var btn = this.playerButtons[i];
    //  console.log(btn.getBounds());
    //  btn.on('pointerover', ()=> {selectHover.x = btn.x; selectHover.y = btn.y});
    //}

    // Add buttons to rows
    rowA.addNode(randoButton);

    rowB.addNode(pakpaoButton);
    rowB.addNode(kidButton, 0, 10);
    rowB.addNode(joanButton, 0, -10);

    rowC.addNode(messengerButton);
    rowC.addNode(randoButton2, 20, 0);

    // Create hover icon
    var firstButton = pakpaoButton.getBounds();
    var selectHover = this.add.sprite(firstButton.x, firstButton.y, "selectHover");
    selectHover.setOrigin(0.0, 0.0);
    selectHover.play('hover', true);

    var prevItemCallback = function (group, context) {
        var f = group.selected.getBounds();
        characterText.text = group.selected.characterName;
        selectHover.x = f.x;
        selectHover.y = f.y;
    };

    var nextItemCallback = function (group, context) {
        var f = group.selected.getBounds();
        characterText.text = group.selected.characterName;
        selectHover.x = f.x;
        selectHover.y = f.y;
    };

    // Attach left/right keyboardGroup
    var keyboardGroup = new uiWidgets.KeyboardGroup(this, true, this);
    keyboardGroup.addNode(randoButton);
    keyboardGroup.addNode(pakpaoButton);
    keyboardGroup.addNode(kidButton);
    keyboardGroup.addNode(joanButton);
    keyboardGroup.addNode(messengerButton);
    keyboardGroup.addNode(randoButton2);

    keyboardGroup.emitter.on('previous', prevItemCallback);
    keyboardGroup.emitter.on('next', nextItemCallback);

    // Add portrait boxes
    this.add.image(0, 240, "portraitBoxLeft").setOrigin(0.0, 1.0);
    this.add.image(320, 240, "portraitBoxRight").setOrigin(1.0, 1.0);

    // Add name boxes
    this.add.image(0, 240, "nameBoxLeft").setOrigin(0.0, 1.0);
    this.add.image(320, 240, "nameBoxRight").setOrigin(1.0, 1.0);

    // Add Title text
    this.add.text(320/2, 10, "Player Select").setOrigin(0.5, 0.0);

    // Add selected character text
    var characterText = this.add.text(5, 240 - 10, 'Pakpao', {'fontSize': '12px'}).setOrigin(0.0, 1.0);

}

function update() {}

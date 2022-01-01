/**
 * 场景
 * @param container
 * @param opts
 * @constructor
 */
function Scene(container, opts) {
  this.heartBeat = opts.heartBeat
  this.music = opts.music
  this.width = opts.width
  this.height = opts.height
  this.stage = new Konva.Stage({
    container: '#container',   // id of container <div>
    width: opts.width,
    height: opts.height,
  });

  this.animation = function () {
    // const tree = new Tree(this)
    // tree.draw()
    new BeatHeart(this)
  }
}

function Sakura(stage) {
  const sakuraLayer = new Konva.layer()
  stage.add(sakuraLayer)
  const sakuraNum = 100

}

/**
 * 树
 * @param scene
 * @constructor
 */
function Tree(scene) {
  const stage = scene.stage
  const percentage = window.innerWidth / window.innerHeight
  let branchData

  this.treeLayer = new Konva.Layer({
    scale: {
      x: percentage,
      y: percentage
    },
    offset: {
      x: -window.innerWidth / 2,
      y: -window.innerHeight / 2
    }
  })
  stage.add(this.treeLayer)
  console.log(this.treeLayer.width())
  console.log(this.treeLayer.height())

  const diffX = window.innerWidth / 2 - 535
  const diffY = window.innerHeight - 700
  initBranch()
  this.branchNum = 11
  this.renderedBranch = 0
  function initBranch() {
    branchData = handleData([535, 700, 570, 250, 500, 200, 30, 100, [
      [540, 500, 455, 417, 340, 400, 13, 100, [
        [450, 435, 434, 430, 394, 395, 2, 40]
      ]],
      [550, 445, 600, 356, 680, 345, 12, 100, [
        [578, 400, 648, 409, 661, 426, 3, 80]
      ]],
      [539, 281, 537, 248, 534, 217, 3, 40],
      [546, 397, 413, 247, 328, 244, 9, 80, [
        [427, 286, 383, 253, 371, 205, 2, 40],
        [498, 345, 435, 315, 395, 330, 4, 60]
      ]],
      [546, 357, 608, 252, 678, 221, 6, 100, [
        [590, 293, 646, 277, 648, 271, 2, 80]
      ]]
    ]])

    function handleData(branchData) {
      return branchData.map(function (item, index) {
        if (Array.isArray(item)) {
          return handleData(item)
        }
        if (index <= 5 && index % 2 === 0) {
          item += diffX
        } else if (index <= 5 && index % 2 === 1) {
          item += diffY
        }
        return item
      })
    }
  }

  this.draw = function () {
    new Branch(this, new Point(branchData[0], branchData[1]), new Point(branchData[2], branchData[3]),
      new Point(branchData[4], branchData[5]), branchData[6], branchData[7], branchData[8])
      .draw()
  }

  this.bloom = new Bloom(scene, this.treeLayer)
}

/**
 * 树枝
 * @param treeLayer
 * @param p1
 * @param p2
 * @param p3
 * @param radius
 * @param length
 * @param otherBranchs
 * @constructor
 */
function Branch(tree, p1, p2, p3, radius, length, otherBranchs) {
  let t = 1 / (length*2 - 1)
  let curLen = 0
  let p
  let r = radius
  const that = this
  ++tree.renderedBranch

  this.draw = function () {
    p = bezier([p1, p2, p3], curLen * t)
    r = r * 0.99
    const circle = new Konva.Circle({
      x: p.x,
      y: p.y,
      radius: r,
      fill: '#9b8e70',
    });
    tree.treeLayer.add(circle)
    circle.zIndex(0)
    ++curLen
    if (curLen < length*2) {
      requestAnimationFrame(that.draw)
    } else if (otherBranchs) {
      otherBranchs.forEach(function (branchData) {
        new Branch(tree, new Point(branchData[0], branchData[1]), new Point(branchData[2], branchData[3]),
          new Point(branchData[4], branchData[5]), branchData[6], branchData[7], branchData[8]).draw()
      })
    } else if (tree.renderedBranch === tree.branchNum) {
      tree.bloom.draw()
    }
  }
}


/**
 * 跳动的心
 * @param scene
 * @constructor
 */
const heartData = 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z'

function BeatHeart(scene) {
  const stage = scene.stage
  const heartLayer = new Konva.Layer();
  const heart = new Konva.Path({
    x: stage.width() / 2 - 20,
    y: stage.height() / 2 - 20,
    data: heartData,
    fill: 'red',
    scale: {
      x: 2,
      y: 2,
    },
    offset: {
      x: 20,
      y: 20
    }
  });
  const highlight = new Konva.Path({
    x: stage.width() / 2 - 20,
    y: stage.height() / 2 - 20,
    data: 'M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1  c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z',
    fill: '#fff',
    scale: {
      x: 2,
      y: 2,
    },
    offset: {
      x: 20,
      y: 20
    }
  })
  heartLayer.add(heart);
  heartLayer.add(highlight)
  stage.add(heartLayer);
  heartLayer.draw();

  const anim = new Konva.Animation(function (frame) {
    const scale = Math.abs(-Math.cos((frame.time * 2 * Math.PI) / 1450) + 2) / 6 + 2;
    // scale x and y
    heart.scale({x: scale, y: scale});
    highlight.scale({x: scale, y: scale});
  }, heartLayer);

  anim.start();
  scene.heartBeat.play()

  setTimeout(function () {
    const tween = new Konva.Tween({
      node: heartLayer,
      duration: 1,
      opacity: 0,
      onFinish: function () {
        heartLayer.destroy()
        scene.heartBeat.pause()
        scene.music.play()

        new Tree(scene).draw()
      }
    });
    tween.play()
  }, 5000)
}

/**
 * 开花
 * @constructor
 */
function Bloom(scene, treeLayer) {
  let num = 0
  let x, y
  const that = this
  const width = 1080, height = 650
  const heartLeafGroup = new Konva.Group({
    scale: {
      x: 0.8,
      y: 0.8
    }
  })
  treeLayer.add(heartLeafGroup)
  // x = 16 sin^3 t
  // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
  // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
  // let heartPoints = [], hx, hy, t;
  // for (let i = 10; i < 30; i += 0.2) {
  //   t = i / Math.PI;
  //   hx = 16 * Math.pow(Math.sin(t), 3);
  //   hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  //   heartPoints.push(new Point(x, y));
  // }

  this.draw = function () {
    x = random(20, width - 20);
    y = random(20, height - 20);
    if (inheart(x - width / 2, height - (height - 40) / 2 - y, 240)) {
      const heart = new Konva.Path({
        x: x-300,
        y: y+70,
        data: heartData,
        fill: 'rgb(255,' + random(0, 255) + ',' + random(0, 255) + ')',
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
        rotation: random(0, 360),
      })
      // heart.cache()
      // heart.filters([Konva.Filters.Blur]);
      // heart.blurRadius(random(0, 40))
      heartLeafGroup.add(heart)

      new Konva.Tween({
        node: heart,
        duration: 0.1,
        opacity: random(0.3, 1),
        scaleX: 0.7,
        scaleY: 0.7
      }).play();
      ++num
    }
    if (num < 700) {
      requestAnimationFrame(that.draw)
    }
  }
}
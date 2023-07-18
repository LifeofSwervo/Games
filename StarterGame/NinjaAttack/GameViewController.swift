

import UIKit
import SpriteKit

class GameViewController: UIViewController {
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    let scene = GameScene(size: view.bounds.size)
    let skView = view as! SKView
    
    scene.scaleMode = .resizeFill
    
    skView.showsFPS = true
    skView.showsNodeCount = true
    skView.ignoresSiblingOrder = true
    
    skView.presentScene(scene)

  }
  
  override var prefersStatusBarHidden: Bool {
    return true
  }
  
}

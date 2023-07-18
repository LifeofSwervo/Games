

import SpriteKit

class GameScene: SKScene, SKPhysicsContactDelegate {
  let player = SKSpriteNode(imageNamed: "player")
  
  var monstersDestroyed = 0
  
  override func didMove(to view: SKView) {
    backgroundColor = SKColor.white
    
    player.position = CGPoint(x: size.width * 0.1, y: size.he  )
    
  }
}



import SpriteKit

class GameScene: SKScene, SKPhysicsContactDelegate {
  
  // Create a player variable. Assign image
  let player = SKSpriteNode(imageNamed: "player")
  
  var monstersDestroyed = 0
  
  override func didMove(to view: SKView) {
    backgroundColor = SKColor.white
    
    // Player Position
    player.position = CGPoint(x: size.width * 0.1, y: size.height * 0.5)
    
    // Add player as child of the scene
    addChild(player)
  }
  
  func random() -> CGFloat {
    return CGFloat(Float(arc4random()) / 0xFFFFFFFF)
  }
  func random(min: CGFloat, max: CGFloat) -> CGFloat {
    return random() * (max - min) + min
  }
  
  // Create Monster
  func addMonster() {

    // Create a monster variable
    let monster = SKSpriteNode(imageNamed: "monster")
    
    // Randomize where the monster will spawn (along Y axis)
    let actualY = random(min: monster.size.height / 2, max: size.height - monster.size.height / 2)
    
    // Place monster slightly off screen on the right edge
    monster.position = CGPoint(x: size.width + monster.size.width / 2, y: actualY)
    
    // Add monster as a child of the scene
    addChild(monster)
    
    // Determine speed of the monster
    let actualDuration = random(min: CGFloat(2.0), max: CGFloat(4.0))
    
    // Create the actions
    let actionMove = SKAction.move(to: CGPoint(x: -monster.size.width / 2, y: actualY),
                                   duration: TimeInterval(actualDuration))
    let actionMoveDone = SKAction.removeFromParent()
    monster.run(SKAction.sequence([actionMove, actionMoveDone]))
  }
}

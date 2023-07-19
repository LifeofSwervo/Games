

import SpriteKit

// Vectors
func +(left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x + right.x, y: left.y + right.y)
}

func -(left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x - right.x, y: left.y - right.y)
}

func *(point: CGPoint, scalar: CGFloat) -> CGPoint {
  return CGPoint(x: point.x * scalar, y: point.y * scalar)
}

func /(point: CGPoint, scalar: CGFloat) -> CGPoint {
  return CGPoint(x: point.x / scalar, y: point.y / scalar)
}

#if !(arch(x86_64) || arch(arm64))
      func sqrt(a: CGFloat) -> CGFloat {
  return CGFloat(sqrtf(Float(a)))
}
#endif

extension CGPoint {
  func length() -> CGFloat {
    return sqrt(x*x + y*y)
  }
  
  func normalized() -> CGPoint {
    return self / length()
  }
}

// Game Scene Class
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
    
    // Monsters will infinitely spawn in game
    run(SKAction.repeatForever(
      SKAction.sequence([
        SKAction.run(addMonster),
        // 1 second delay between monster Spawns
        SKAction.wait(forDuration: 1.0)
      ])
    ))
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

    // Make the object move off-screen to the left
    let actionMove = SKAction.move(to: CGPoint(x: -monster.size.width / 2, y: actualY),
                                   duration: TimeInterval(actualDuration))
    // Removes monster from the scene when it is no longer visible
    let actionMoveDone = SKAction.removeFromParent()
    monster.run(SKAction.sequence([actionMove, actionMoveDone]))
  }
}

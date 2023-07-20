

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
  
  override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
    // 1
    guard let touch = touches.first else {
      return
    }
    let touchLocation = touch.location(in: self)
    
    // 2
    let projectile = SKSpriteNode(imageNamed: "projectile")
    projectile.position = player.position
    
    // 3 - Determine offset of location to projectile
    let offset = touchLocation - projectile.position
    
    // 4 - Bail out if you are shooting down or backwards
    if offset.x < 0 { return }
    
    // 5 - Add projectile as child of the scene
    addChild(projectile)
    
    // 6 - Get direction where to shoot
    let direction = offset.normalized()
    
    // 7
    let shootAmount = direction * 1000
    
    // 8 -
    let realDest = shootAmount + projectile.position
    
    // 9 - Create the actions
    let actionMove = SKAction.move(to: realDest, duration: 2.0)
    let actionMoveDone = SKAction.removeFromParent()
    projectile.run(SKAction.sequence([actionMove, actionMoveDone]))
    
  }
  
}

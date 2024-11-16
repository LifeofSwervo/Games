#include "Common.h"
#include "Vec2.hpp"

class CTransform
{
public:
    Vec2 pos = { 0.0, 0.0 }; // Center of object
    Vec2 velocity = { 0.0, 0.0 };
    float angle = 0;
    
    // Constructor
    CTransform(const Vec2 & p, const Vec2 & v, float a)
    : pos(p), velocity(v), angle(a) {}
};

class CShape
{
    // Import sf circle
    
    // Default constructor
    CShape(float radius, int points, const color, const outline, const thickness)
        : circle(radius, points)
    {
        //circle.setFillColor(fill);
        //ciecle.setOutlineColor(outline);
        //circle.setOrgin(radius, radius);
    }
};

class CCollision
{
public:
    float radius = 0;
    
    CCollision(float r)
        : radius(r) {}
};

class CScore
{
public:
    int score = 0;
    
    CScore(int s)
        : score(s) {}
    
};

class CLifespan
{
public:
    int remaining = 0; // "Amount of total lifespan remaining on the enemy"
    int total = 0; // "The total initial amount of lifespan"
    
    CLifespan(int remain, int total)
        : remaining(remain), total(total) {}
};

class CInput
{
public:
    bool up = false;
    bool right = false;
    bool down = false;
    bool left = false;
    
    bool shoot = false;
    
    CInput() {}
};




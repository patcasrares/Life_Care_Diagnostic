# Create a simple Survival Prediction Model with if/else statements 
def survivalModel(age, nodes):
    
    if nodes in range(0, 4):            
        if age in range(30, 41): 
            return 'Survival rate is approximately 90%'
            
        else:
            return 'Survival rate is approximately 74%'
            
    elif nodes in range(4, 7):              
        if age in range(30, 51):
            return 'Survival rate is approximately 75%'
        else:
            return 'Survival rate approximately 47%'
    elif nodes >= 7:              
        if age in range(30, 51):
            return 'Survival rate is approximately 54%'
        else:
            return 'Survival rate is approximately 40%'
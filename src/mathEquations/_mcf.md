## Mathematical Formulation

The framework combines **optimization** and **reinforcement learning** to redesign complex networks while preserving their functional behavior.  
It works in three main stages:

---

### **1️⃣ Minimum Cost Flow (MCF) — Understanding the network**

The first step models how the network currently operates.

Each node (e.g., a plant or a consumer) can supply or demand a certain amount of flow, and each connection $(i, j)$ has an associated cost $c_ij$.  
The goal is to determine the optimal flow $x_ij$ across all connections to satisfy demand at the lowest total cost.

**Simplified formulation:**
$$
\min \sum_{(i,j)\in A} c_{ij}\,x_{ij}
$$

Subject to:
$$
\sum_{j:(i,j)\in A} x_{ij} - \sum_{j:(j,i)\in A} x_{ji} = b_i
$$

This balance ensures that every node sends and receives exactly what it should — no shortages, no excess.

---

### **2️⃣ Topology Reduction — Redesigning with constraints**

Once the baseline flows are known, the next challenge is to **redesign** the network using fewer connections while maintaining similar performance.

We introduce binary variables $y_ij ∈ {0,1}$ to decide whether a connection remains active.  
The model minimizes the difference between the new network’s performance and the original one, while respecting a structural limit on the number of arcs.

**Objective (conceptually):**
$$
\min \; \text{Cost difference + penalty for under/over supply}
$$

Subject to:
- Flow balance (as before)  
- Arc limit:  ∑ y_ij ≤ K  
- Capacity and feasibility constraints

In essence, the model finds the “best reduced version” of the network that still behaves like the original.

---

### **3️⃣ Reinforcement Learning — Learning to simplify**

Finally, a reinforcement learning agent refines the reduction process.  
Starting from the optimized network, it explores **small structural changes** — adding, removing, or swapping connections — and learns which patterns preserve flow efficiency best.

At each iteration, the agent:
1. Modifies the network (e.g., removes one pipe).  
2. Recomputes flow performance.  
3. Receives a **reward** based on how close the reduced flow is to the original.

The update rule follows the **Vanilla Policy Gradient** approach:

$$
\theta_{t+1} = \theta_t + \alpha \nabla_\theta J(\theta_t)
$$

The agent keeps learning until the network stabilizes — achieving a structure that is smaller, cheaper, and nearly as efficient.


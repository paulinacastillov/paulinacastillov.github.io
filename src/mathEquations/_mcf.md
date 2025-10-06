## Magic behind

The framework combines **optimization** and **reinforcement learning** to redesign complex networks while preserving their functional behavior.  
It works in three main stages:

---

### **1️⃣ Minimum Cost Flow (MCF) — Understanding the network**

In the first stage, the model captures how the network behaves under different demand conditions.  
Each scenario $ \omega \in \Omega $ represents a variation in the nodal demands or flow requirements.

The goal is to **distribute the flow efficiently** through the network, minimizing the total cost while allowing small deviations from perfect balance when necessary.

### **Formulation**

For each scenario $ \omega $, we solve:
$$
\min \sum_{(i,j)\in A} c_{ij} \, x_{ij}^{\omega}
\; + \;
M \sum_{i\in N} \Delta_i^{\omega}
$$

Subject to:

$$
\sum_{j:(i,j)\in A} x_{ij}^{\omega}
-
\sum_{j:(j,i)\in A} x_{ji}^{\omega}
=
b_i^{\omega} + \Delta_i^{\omega},
\quad \forall i \in N
$$

where:

- $ x_{ij}^{\omega} $ — flow through arc $ (i,j) $ under scenario $ \omega $
- $ c_{ij} $ — cost per unit of flow on arc $ (i,j) $
- $ b_i^{\omega} $ — supply (positive) or demand (negative) at node $ i $
- $ \Delta_i^{\omega} \ge 0 $ — deviation variable that penalizes unmet or excess demand
- $ M $ — large penalty constant for deviations

---

### **Interpretation**

This model ensures that the flow entering and leaving each node is balanced as closely as possible to its expected demand.  
When perfect balance cannot be achieved, a deviation $ \Delta_i^{\omega} $ is introduced and penalized in the objective function.

By solving the MCFP for multiple scenarios $ \omega \in \Omega $,  
we can observe how the network behaves under different demand patterns —  
establishing a **baseline of flow efficiency** and **operational cost** for the system.

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


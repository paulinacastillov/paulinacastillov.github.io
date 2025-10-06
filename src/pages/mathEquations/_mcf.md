## KaTeX quick test

Inline: the flow variable is \( x_{ij}^{\omega} \) and the cost is \( c_{ij} \).

Block:
$$
\min \sum_{(i,j)\in A} c_{ij}\, x_{ij}^{\omega}
$$

Constraint:
$$
\sum_{j:(i,j)\in A} x_{ij}^{\omega}
- \sum_{j:(j,i)\in A} x_{ji}^{\omega}
= b_{i}^{\omega}
$$

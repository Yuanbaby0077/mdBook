class Matrix {
  constructor(coordinates) {
    this.data = []
    this.init(coordinates)
  }

  init(coordinates) {
    coordinates.forEach(coor => {
      this.setVal(coor.x, coor.y, coor.id)
    })
  }

  setVal(x, y, id) {
    if (this.data[y] === undefined) {
      this.data[y] = []
    }
    this.data[y][x] = id
  }

  count(coordinates) {
    this.rowCount = this.data.length
    this.colCount = Math.max.apply(null, coordinates.map(c => c.x)) + 1
  }

  /**
   * 遍历某一列
   * @param {*} col 
   * @param {*} row 
   */
  searchColNodes(col) {
    const res = []
    for (let i = 0; i < this.data.length; i++) {
      res.push(this.data[i][col])
    }
    return res
  }

  fn(col) {
    const emptyRows = []
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i][col] && emptyRows.length) {
        const { x, y, id } = this.data[i][col]
        const newRow = emptyRows.shift()
        this.data[newRow][col] = {
          x,
          y: newRow,
          id
        }
      } else {
        emptyRows.push(i)
      }
    }
  }
}

const coordinates = [
  {
    x: 0,
    y: 0,
    id: 0
  },
  {
    x: 1,
    y: 0,
    id: 1
  },
  {
    x: 2,
    y: 0,
    id: 2
  },
  {
    x: 3,
    y: 0,
    id: 3
  },
  {
    x: 4,
    y: 0,
    id: 4
  },
  {
    x: 0,
    y: 1,
    id: 10
  },
  {
    x: 1,
    y: 1,
    id: 11
  },
  {
    x: 2,
    y: 1,
    id: 12
  },
  {
    x: 3,
    y: 1,
    id: 13
  }
]
const matrix = new Matrix(coordinates)
console.log(matrix.searchColNodes(1))
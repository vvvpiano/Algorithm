package prog;

import java.util.ArrayList;
import java.util.Collections;

public class findRoute {
    public static void main(String[] args) {
        int[][] nodeinfo = {
                {5,3}, {11,5}, {13,3}, {3,5}, {6,1},
                {1,3}, {8,6}, {7,2}, {2,2}
        };

        ArrayList<TreeNode> nodes = new ArrayList<>();
        for (int i = 0; i < nodeinfo.length ; i++) {
            nodes.add(new TreeNode(nodeinfo[i][0], nodeinfo[i][1], i+1));
        }
        System.out.println();
        Collections.sort(nodes);

        BinarySearchTree bst = new BinarySearchTree();
        nodes.forEach(node -> bst.insertBST(node));

        int[] pre = bst.order("pre");
        int[] post = bst.order("post");
        int[][] answer = {pre,post};
    }
}

class TreeNode implements Comparable<TreeNode>{
    int x, y;
    int index;
    TreeNode left;
    TreeNode right;
    TreeNode() {
        this.left = null;
        this.right = null;
    }
    TreeNode(int x, int y, int index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.left = null;
        this.right = null;
    }

    int getX() {
        return this.x;
    }
    int getY() {
        return this.y;
    }
    public String toString() {
        String str;
        str = String.format("[x,y] = [%d, %d], index = %d", this.x, this.y, this.index);
        return str;
    }

    @Override
    public int compareTo(TreeNode o) {
        return (o.y - this.y);
    }
}

class BinarySearchTree{
    private TreeNode root = new TreeNode();
    public TreeNode insertKey(TreeNode root, TreeNode newNode){
        TreeNode p = root;
        if(p==null)
            return newNode;
        else if(p.x > newNode.x) {
            p.left = insertKey(p.left, newNode);
            return p;
        } else if(p.x < newNode.x) {
            p.right = insertKey(p.right, newNode);
            return p;
        } else return p;
    }

    public void insertBST (TreeNode newNode) {
        root = insertKey(root, newNode);
    }

    public int[] order(String type) {
        ArrayList<Integer> Order = new ArrayList<>();
        if (type.equals("pre"))
            preorder(Order, this.root);
        else //post
            postorder(Order, this.root);

        return ListToArray(Order);
    }

    public void preorder(ArrayList<Integer> preOrder, TreeNode root) {
        if(root != null) {
            if(!(root.index == 0))
                preOrder.add(root.index);
            preorder(preOrder, root.left);
            preorder(preOrder, root.right);
        }
    }

    public void postorder(ArrayList<Integer> postOrder, TreeNode root) {
        if(root != null) {
            postorder(postOrder, root.left);
            postorder(postOrder, root.right);
            if(!(root.index == 0))
                postOrder.add(root.index);
        }
    }

    public int[] ListToArray(ArrayList<Integer> list) {
        int[] array = new int[list.size()];
        int i = 0;
        for(int n: list)
            array[i++] = n;
        return array;
    }
}